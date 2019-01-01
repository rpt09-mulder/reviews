import React from 'react';
import Rating from './Rating.jsx';
import Search from './Search.jsx';
import styles from '../styles/reviewsHeader.styles.css';
import starStyles from '../styles/rating.styles.css';
// import reviewStyles from '../styles/review.styles.css';

const ReviewsHeader = ({ reviews, average }) => {

  return (
    <div>
      <div className={styles.totalContainer}>
        <div className={styles.totalContainerInner}>
          <div className={styles.numberContainerOuter}>
            <div className={styles.numberContainer}>
              <div className={styles.number}>
                <h2 className={styles.reviewsHead}>
                  <span className={styles.text}>
                    {reviews.length} {reviews.length > 1 || reviews.length < 1 ? 'Reviews' : 'Review'} 
                  </span>
                </h2>
                <div className={starStyles.starsContainer}>
                  <div>
                    <Rating average={average}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.searchContainerOuter}>
            <Search />
          </div>
        </div>
      </div>
      <div className={styles.lineContainer}>
        <div className={styles.line}></div>
      </div>

    </div>
  )
};

export default ReviewsHeader;