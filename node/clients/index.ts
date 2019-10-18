import { IOClients } from '@vtex/api'

import Reviews from './reviews'
import Summary from './summary'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get reviews() {
    return this.getOrSet('reviews', Reviews)
  }
  public get summary() {
    return this.getOrSet('summary', Summary)
  }
}