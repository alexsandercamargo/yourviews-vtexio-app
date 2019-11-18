import React, { useContext, useState, useEffect } from 'react'
import { withApollo } from 'react-apollo'
import querySummary from './graphql/queries/querySummary.gql'
import { ProductContext } from 'vtex.product-context'

//import { Link } from 'vtex.render-runtime'
import Stars from './components/Stars'

const RatingSummary = (props) => {
  const [rating, setRating] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  const { product } = useContext(ProductContext)

  useEffect(() => {
    if (!product || !product.productId)
      return

    let query = {
      query: querySummary,
      variables: {
        productId: product.productId
      }
    }

    setLoading(true)
    props.client
    .query(query)
    .then(response => {
      const element = response.data.productSummary.Element
      if(element === null)
        return

      setRating(element.Rating)
      setTotal(element.TotalRatings)
    })
    .catch(() => {
      setHasError(true)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [product, props.client])

  const goToReview = () => {
    const review = document.getElementById("yv-reviews")
    if (!review)
      return
    
    window.scrollTo({
      top: review.offsetTop - 100,
      behavior: "smooth"
    })
  }

  return (
    !hasError && 
        <div className="yourviews-rating-summary mt3">
          {!loading && rating > 0 ?
            <div className="flex items-center pointer" onClick={() => goToReview()}>
              <div className="nowrap dib">
                <Stars rating={rating} />
              </div>
              <span className="c-muted-2 t-body">
                ({total} {total == 1 ? " avaliação" : " avaliações"})
              </span>
              {/*<Link
                className="ml2 c-link t-body"
                to={
                  `/new-review?product_id=${product.productId}&return_page=/${product.linkText}/p`}>
                    Escrever avaliação
                </Link>*/}
            </div> :
            <div className="nowrap dib">
              <Stars rating={0} />
            </div>
          }
        </div>
  )
}

export default withApollo(RatingSummary)
