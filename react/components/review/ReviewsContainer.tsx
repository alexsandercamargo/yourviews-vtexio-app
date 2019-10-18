import React from 'react'

//import ReviewFilter from './ReviewFilter'
import Histogram from './Histogram'
import ReviewRating from './ReviewRating'
import ReviewRecommend from './ReviewRecommend'
import FieldSummary from './FieldSummary'
import ReviewItem from './ReviewItem'

const ReviewsContainer = (props: any) => {

  return (
    <div>
      <h3>
        Avaliações 
      </h3>
      <div className="mb7 bw2 bb b--muted-5 mb5 pb7">
        <div className="flex flex-wrap justify-around items-center">
          {props.summaryReviews.RatingHistogram 
            && props.summaryReviews.RatingHistogram.RatingList.length > 0 &&
              <Histogram ratingList={props.summaryReviews.RatingHistogram.RatingList}/>
            }

          <ReviewRating 
            rating={props.summaryReviews.Rating}
            totalRatings={props.summaryReviews.TotalRatings}/>

          {props.summaryReviews.Recommend && 
            props.summaryReviews.Recommend.RecommendPercent > 0 && 
              <ReviewRecommend 
                recommendPercent={props.summaryReviews.Recommend.RecommendPercent}/>}
        </div>

        {props.summaryReviews.FieldSummary && 
          props.summaryReviews.FieldSummary.FieldList.length > 0 &&
            <FieldSummary fieldList={props.summaryReviews.FieldSummary.FieldList}/>
        }
        
        {/*props.summaryReviews.Filters && 
          props.summaryReviews.Filters.length > 0 &&
            <ReviewFilter 
              filters={props.summaryReviews.Filters} 
        setFilter={(filterIdx: number, valueIdx: number) => props.setFilter(filterIdx, valueIdx)}/>*/}
        
      </div>
      <div>
        {props.reviews.map((review: any, idx: number) => 
          <ReviewItem review={review} key={idx}/>)}
      </div>
    </div>
  )
}

export default ReviewsContainer