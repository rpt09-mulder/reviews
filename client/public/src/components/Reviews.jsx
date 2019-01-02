import React from 'react';
import Review from './Review.jsx';

const Reviews = (props) => {
  return (
    <div className="reviewsContainer">
      {
        props.reviews.map((review, index) => {
          return <Review key={index} review={review} />
        })
      }
    </div>
  )
};

export default Reviews;