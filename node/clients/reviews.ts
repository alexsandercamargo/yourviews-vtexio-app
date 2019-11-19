import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

type GetReviewArgs = {
  storeKey: string;
  apiUser: string;
  apiPassword: string;
  productId: string;
  page?: string;
  count?: string;
  orderBy?: string;
  filters?: string;
}

export default class Reviews extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://service.yourviews.com.br/api/', context, options)
  }

  public async getReviews (
    {
      storeKey = "", apiUser = "", apiPassword = "", productId = "", 
      page = "1", count = "5", orderBy = "0", filters = ""
    } : GetReviewArgs): Promise<string> {

    if (!storeKey || !apiUser || !apiPassword)
      return ""

    const endpoint = `${storeKey}/review/${productId}/fullreview`
    const queryString = `?page=${page}&count=${count}&orderBy=${orderBy}&filters=${filters}`
    
    const auth = "Basic " + new Buffer(apiUser + ":" + apiPassword).toString("base64")

    console.log(this.http.get(endpoint + queryString, {
      metric: 'yourviews-get-reviews',
      headers: {
        'Authorization': auth
      }
    }))

    return this.http.get(endpoint + queryString, {
      metric: 'yourviews-get-reviews',
      headers: {
        'Authorization': auth
      }
    })
  }
}