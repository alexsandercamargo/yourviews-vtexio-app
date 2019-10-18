import React from 'react'

import Stars from '../Stars'

const ReviewRating = (props: any) => (
  <div className="tc">
    <Stars rating={props.rating.toFixed(1)} />
    <span className="dib v-mid c-muted-1">
      ({props.rating.toFixed(1)})
    </span>
    <p>
      {props.totalRatings}
      {props.totalRatings == 1 ? " avaliação" : " avaliações"}
    </p>
  </div>
)
export default ReviewRating