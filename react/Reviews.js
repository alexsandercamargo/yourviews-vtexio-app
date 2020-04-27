import React from 'react'
import { withApollo } from 'react-apollo'
import queryRatingSummary from './graphql/queries/queryRatingSummary.gql'
import { withRuntimeContext } from 'vtex.render-runtime'

import { Box, Spinner, Pagination, Button } from 'vtex.styleguide'
import ReviewContainer from './components/review/ReviewsContainer'
import ReviewEmpty from './components/review/ReviewEmpty'

const itemPerPage = 5

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      summaryReviews: null,
      paging: {
        from: 1,
        to: itemPerPage,
        total: itemPerPage,
        current: 1,
      },
      orderBy: 0, //0: Recente;
      filters: '',
      error: {
        hasError: false,
        item: null,
      },
      loading: false,
    }

    this.reviewRef = React.createRef()
  }

  componentDidMount() {
    this.getReviewData(true)
  }

  componentDidUpdate(prevProps) {
    if (this.props.productQuery.product && !prevProps.productQuery.product)
      this.getReviewData(true)
  }

  render() {
    return (
      !this.state.error.hasError && (
        <Box>
          {this.state.loading && <Spinner />}

          {!this.state.loading && this.state.reviews.length < 1 && (
            <ReviewEmpty writeReview={() => this.writeReview()} />
          )}

          {!this.state.loading && this.state.reviews.length > 0 && (
            <div ref={this.reviewRef} id="yv-reviews">
              <ReviewContainer
                summaryReviews={this.state.summaryReviews}
                reviews={this.state.reviews}
                setFilter={this.setFilter}
              />

              {this.state.reviews.length > 0 && (
                <Pagination
                  currentItemFrom={this.state.paging.from}
                  currentItemTo={this.state.paging.to}
                  textOf="de"
                  textShowRows="Linhas"
                  totalItems={this.state.paging.total}
                  onNextClick={() => this.changePage(1)}
                  onPrevClick={() => this.changePage(-1)}
                />
              )}

              <Button variation="primary" onClick={() => this.writeReview()}>
                Escrever avaliação
              </Button>
            </div>
          )}
        </Box>
      )
    )
  }

  getReviewData = notScroll => {
    const { productId } = this.props.productQuery.product || {}
    if (!productId) return

    let query = {
      query: queryRatingSummary,
      variables: {
        productId: productId, //"7935251",
        page: this.state.paging.current,
        count: itemPerPage,
        orderBy: this.state.orderBy,
        filters: this.state.filters || '',
      },
    }

    this.setState({ loading: true })
    this.props.client
      .query(query)
      .then(response => {
        if (
          response.data.productReviews.HasErrors ||
          response.data.productReviews.HasErrors === null
        )
          throw new Error('Server error')

        const element = response.data.productReviews.Element
        if (element === null) return
        let paging = this.state.paging
        paging.total = element.TotalRatings

        this.setState(
          {
            reviews: element.Reviews,
            summaryReviews: element,
          },
          () => this.afterLoadReview(notScroll)
        )
      })
      .catch(error => {
        const errorItem = {
          item: error,
          hasError: true,
        }
        this.setState({
          error: errorItem,
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  afterLoadReview = notScroll => {
    setTimeout(() => {
      if (
        !notScroll &&
        this.state.reviews.length > 0 &&
        this.reviewRef.current !== null
      )
        window.scrollTo({
          top: this.reviewRef.current.offsetTop - 100,
          behavior: 'smooth',
        })
    }, 100)

    this.activeFilters()
  }

  setFilter = (filterIdx, valueIdx) => {
    let newSummary = this.state.summaryReviews
    newSummary.Filters[filterIdx].FilterValues[valueIdx].Active = !(
      this.state.summaryReviews.Filters[filterIdx].FilterValues[valueIdx]
        .Active || false
    )

    this.setState(
      {
        summaryReviews: newSummary,
      },
      this.loadFilters
    )
  }

  loadFilters = () => {
    let filtersObj = this.state.summaryReviews.Filters
    let filtersStr = ''

    filtersObj.forEach(filter => {
      filter.FilterValues.forEach(value => {
        if (value.Active)
          filtersStr = `${filtersStr}${filter.FilterId}:${value.FilterValueId},`
      })
    })

    this.setState(
      {
        filters: filtersStr,
      },
      this.getReviewData
    )
  }

  activeFilters = () => {
    let filters = this.state.filters
    let newSummary = this.state.summaryReviews

    newSummary.Filters.forEach((filter, idxFilter) => {
      filter.FilterValues.forEach((value, idxValue) => {
        if (filters.indexOf(value.FilterValueId) > -1)
          newSummary.Filters[idxFilter].FilterValues[idxValue].Active = true
        else newSummary.Filters[idxFilter].FilterValues[idxValue].Active = false
      })
    })

    this.setState({
      summaryReviews: newSummary,
    })
  }

  changePage = change => {
    let paging = this.state.paging
    paging.current = this.state.paging.current + change
    paging.from = itemPerPage * paging.current - (itemPerPage - 1)
    paging.to = itemPerPage * paging.current

    this.setState(
      {
        paging: paging,
      },
      this.getReviewData
    )
  }

  writeReview = () => {
    const prod = this.props.productQuery.product

    const page = '/new-review'
    const id = `product_id=${prod.productId}`
    const name = `&product_name=${prod.productName || prod.titleTag}`
    const url = `&return_page=/${prod.linkText}/p`
    const show = `&yv-write-review=true`

    this.props.runtime.navigate({
      to: page,
      query: id + name + url + show,
      params: {
        product: this.props.productQuery.product,
      },
    })
  }
}

export default withRuntimeContext(withApollo(Reviews))
