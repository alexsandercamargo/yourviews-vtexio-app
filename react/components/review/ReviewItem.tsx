import React from 'react'

import Stars from '../Stars'

const ReviewItem = (props: any) => {
  const getTimeAgo = (time: string) => {
    let before = new Date(time)
    let now = new Date()
    let diff = new Date(now.valueOf() - before.valueOf())
  
    let minutes = diff.getUTCMinutes()
    let hours = diff.getUTCHours()
    let days = diff.getUTCDate() - 1
    let months = diff.getUTCMonth()
    let years = diff.getUTCFullYear() - 1970
  
    if (years != 0) {
      return `${years} ${years > 1 ? 'anos' : 'ano'} atrás`
    } else if (months != 0) {
      return `${months} ${months > 1 ? 'meses' : 'mês'} atrás`
    } else if (days != 0) {
      return `${days} ${days > 1 ? 'dias' : 'dia'} atrás`
    } else if (hours != 0) {
      return `${hours} ${hours > 1 ? 'horas' : 'hora'} atrás`
    } else {
      return `${minutes} ${minutes > 1 ? 'minutos' : 'minuto'} atrás`
    }
  }
  
  return (
    <div className="bw2 bb b--muted-5 mb5 pb4">
      <div className="flex flex-wrap justify-between items-center">
        <Stars rating={props.review.Rating}/>
        <span className="dib mr5 black-70 f6">
          Enviado há {getTimeAgo(props.review.Date)}
        </span>
      </div>
      {props.review.ReviewTitle && 
        <h5 className="review-title lh-copy mw9 t-heading-5 mv5">
          {props.review.ReviewTitle}
        </h5>}
      <p className="lh-copy mw9 f4">
        {props.review.Review}
      </p>
      {props.review.CustomFields && props.review.CustomFields.length > 0 &&
        <ul className="review-custom-fields list pa0 f6">
          {props.review.CustomFields.map((item: any, idx: number) => 
            <li className="dib mr7" key={idx}>
              <label className="b">{item.Name}</label>
              <p className="mt1">{item.Values.join(", ")}</p>
            </li>)}
        </ul>}
      
      <ul className="pa0">
        <li className="dib mr5">
          <strong>Por</strong> {props.review.User.Name}
        </li>
        {props.review.User.City && props.review.User.State &&
          <li className="dib">
            <strong>De</strong> {`${props.review.User.City} - ${props.review.User.State}`}
          </li>
        }
      </ul>
      {props.review.CustomerPhotos && props.review.CustomerPhotos.length > 0 &&
        <div className="mt6 flex flex-wrap items-start">
          {props.review.CustomerPhotos.map((photo: string, i: number) => {
            return (
              <img
                alt="User product image"
                className="di mb5 mw4"
                key={i}
                src={photo}
              />
            )
          })}
        </div>}
    </div>
  )
}
export default ReviewItem