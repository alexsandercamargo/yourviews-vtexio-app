import getConfig from '../graphql/getConfig.gql'
import { graphql } from 'react-apollo'

export interface Settings {
  storeKey: String
  apiUser: String
}

const withGetConfig = graphql<{}, Settings>(getConfig)

export default withGetConfig
