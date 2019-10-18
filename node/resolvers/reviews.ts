import {ApolloError} from 'apollo-server'

declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

export const queries = {
  productReviews: async (_: any, args: any, ctx: Context) => {
    const { productId, page, count, orderBy, filters } = args
    const { clients: { apps, reviews: reviewsClient }} = ctx

    const appId = process.env.VTEX_APP_ID
    const { storeKey, apiUser, apiPassword } = await apps.getAppSettings(appId)
    
    let reviews: any
    try {
      reviews = await reviewsClient.getReviews(
        {storeKey, apiUser, apiPassword, productId, page, count, orderBy, filters})
    } catch (error) {
      throw new TypeError(error.response.data)
    }

    if (reviews.HasErrors) {
      throw new ApolloError(reviews.ErrorList[0].Message, reviews.ErrorList[0].Code)
    }
    
    return reviews
  },
  productSummary: async (_: any, args: any, ctx: Context) => {
    const { productId } = args
    const { clients: { apps, summary: summaryClient }} = ctx

    const appId = process.env.VTEX_APP_ID
    const { storeKey, apiUser, apiPassword } = await apps.getAppSettings(appId)
    
    let summary: any
    try {
      summary = await summaryClient.getSummary({storeKey, apiUser, apiPassword, productId})
    } catch (error) {
      throw new TypeError(error.response.data)
    }

    if (summary.HasErrors) {
      throw new ApolloError(summary.ErrorList[0].Message, summary.ErrorList[0].Code)
    }
    
    return summary
  },
  getConfig: async (_: any, __: any, ctx: Context) => {
    const { clients: { apps }} = ctx
    const appId = process.env.VTEX_APP_ID
    const { storeKey, apiUser } = await apps.getAppSettings(appId)
    return {
      storeKey: storeKey,
      apiUser: apiUser
    }
  },
}
