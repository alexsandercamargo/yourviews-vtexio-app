import React from 'react'

const ReviewRecommend = (props: any) => (
  <div className="flex items-center">
    <div className="flex items-center justify-center mr4 w3 h3 ba b--yellow br-100 bw1">
      {props.recommendPercent.toFixed(1) + " "} %
    </div>
    <label>Recomendam este produto</label>
  </div>
)
export default ReviewRecommend