import { useState } from 'react'

const TourCard = ({ id, image, info, name, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <article className="single-tour">
      <img src={image} alt={name} className="img" />
      <div className="tour-info">
        <h4>{name}</h4>
        <h4 className="tour-price">${price}</h4>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button 
            className="info-btn" 
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
        <button 
          className="delete-btn"
          onClick={() => removeTour(id)}
        >
          Not Interested
        </button>
      </div>
    </article>
  )
}

export default TourCard