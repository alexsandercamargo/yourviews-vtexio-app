import { useRuntime, useState } from 'vtex.render-runtime'
import getConfig from './graphql/getConfig.gql'
import { graphql } from 'react-apollo'
import { useEffect } from 'react'
import { Spinner } from 'vtex.styleguide'

const ReviewForm = props => {
  const { storeKey } = props.data.getConfig || {}
  const { query } = useRuntime()

  useEffect(() => {
    if (props.data.loading) 
      return

    let duplicated = document.getElementById("yv__script-form")
    if (duplicated) 
      duplicated.remove()

    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'yv__script-form'
    script.onload = () => {
      let returnPage = window.location.origin + '/'
      if (query.product_id && query.product_name && query.return_page) 
        returnPage = processData()
        
      window.yv.returnPage = returnPage 
    }

    script.src = `https://service.yourviews.com.br/script/${storeKey}/yvapi.js`
    document.body.appendChild(script)

  }, [props.data, query.product_id, query.return_page])

  const processData = () => {
    const returnPage = window.location.origin + query.return_page

    window.yv.productId = query.product_id
    window.yv.productUrl =  returnPage
    window.yv.productName = query.product_name
    window.yv.imageUrl = "https://s3.amazonaws.com/yv-misc/UnavailableImage.png"

    return returnPage
  }
  return (
    <div id="yv-show-form" className="mw8 center mt4 pl4">
      {/* Form will load here */}
      <div className="flex justify-center">
        <Spinner/>
      </div>
    </div>
  )
}

const withGetConfig = graphql(getConfig, {
  options: () => ({
    ssr: false,
  }),
})

export default withGetConfig(ReviewForm)
