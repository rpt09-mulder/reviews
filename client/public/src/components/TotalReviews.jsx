import React from 'react';
import Rating from './Rating.jsx';
import styles from '../styles/totalReviews.styles.css';
import starStyles from '../styles/rating.styles.css';

const TotalReviews = ({ reviews, average }) => {

  return (
    <div>
      <div className={styles.totalContainer}>
        <div className={styles.totalContainerInner}>
          <div className={styles.numberContainer}>
            <div className={styles.number}>
              <h2 className={styles.reviewsHead}>
                <span className={styles.text}>
                  {reviews.length} {reviews.length > 1 || reviews.length < 1 ? 'Reviews' : 'Review'} 
                </span>
              </h2>
              <div className={starStyles.starsContainer}>
                <Rating average={average}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default TotalReviews;