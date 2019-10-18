import React from 'react'

import styles from '../../styles.css'

const Histogram = (props: any) => (
  <ul className="list pa0">
    {props.ratingList.map((histogram: any) => 
      <li className="flex items-center" key={histogram.Rate}>
        <span>
          {histogram.Rate} estrelas
        </span>
        <div className={`${styles.reviewHistogramBar} w4 bg-near-white mr4 ml4`}>
          <div className="review-histogram-bar-growth h-100 bg-yellow"
            style={{ width: `${histogram.PercentRating}%` }}></div>
        </div>
        <span>
          {histogram.Total}
        </span>
      </li>)}
  </ul>
)
export default Histogram