import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

type GetSummaryArgs = {
  storeKey: string;
  apiUser: string;
  apiPassword: string;
  productId: string;
}

export default class Summary extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://service.yourviews.com.br/api/', context, options)
  }

  public async getSummary (
    {
      storeKey = "", apiUser = "", apiPassword = "", productId = ""
    } : GetSummaryArgs): Promise<string> {

      if (!storeKey || !apiUser || !apiPassword)
        console.error('[Yourviews] No API keys set. Please use the VTEX Admin to set them.')
      
    const endpoint = `${storeKey}/review/summary`
    const queryString = `?productId=${productId}`
    
    const auth = "Basic " + new Buffer(apiUser + ":" + apiPassword).toString("base64");
    return this.http.get(endpoint + queryString, {
      metric: 'yourviews-get-summary',
      headers: {
        'Authorization': auth
      }
    })
  }
}