import React, { useState, useEffect } from 'react'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import querySummary from './graphql/queries/querySummary.gql'
import { withApollo } from 'react-apollo'
import Stars from './components/Stars'

const RatingInline = props => {
  const { product } = useProductSummary()

  const [rating, setRating] = useState(0)
  const [total, setTotal] = useState(0)
  const [canShow, setCanShow] = useState(false)

  useEffect(() => {
    if (!product || !product.productId) return

    let query = {
      query: querySummary,
      variables: {
        productId: product.productId,
      }
    }

    props.client.query(query).then(response => {
      setCanShow(true)
      const element = response.data.productSummary.Element
      if (element === null) return

      setRating(element.Rating)
      setTotal(element.TotalRatings)
      
    }).catch(() => {
      setCanShow(false)
    })
  }, [product, props.client])

  return (
    canShow && (
      <div className="yourviews-rating-inline mw8 center ph5">
        <Stars rating={rating} />
        {total > 0 && <span>({total})</span>}
      </div>
  )
}

export default withApollo(RatingInline)
