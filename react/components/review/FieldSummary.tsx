import React from 'react'

import Stars from '../Stars'

const FieldSummary = (props: any) => (
  <ul className="pa0 tc">
    {props.fieldList.map((fieldRating: any, idx: number) => 
      <li key={idx} className="dib mr7">
        <label className="db mb1">{fieldRating.FieldTitle}</label>
        <Stars rating={fieldRating.Average.toFixed(1)} />
        <span className="dib v-mid c-muted-1">
          {fieldRating.Total}
          {fieldRating.TotalRatings == 1 ? " avaliação" : " avaliações"}
        </span>
      </li>)}
  </ul>
)
export default FieldSummary