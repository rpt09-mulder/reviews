import React, { Component } from 'react';
import styles from '../styles/ratingsContainer.styles.css';
import Rating from './Rating.jsx';

const RatingsBox = ({ avg }) => {
  return (
    <div className={styles.ratingsContainer}>
      <div className={styles.ratingsContainerInner}>
        <div>
          <Rating name="Accuracy" avg={avg.acc}/>
          <Rating name="Communication" avg={avg.com}/>
          <Rating name="Communication" avg={avg.cle}/>
        </div>
      </div>
      <div className={styles.ratingsContainerInner}>
        <div>
          <Rating name="Location" avg={avg.loc}/>
          <Rating name="Check-in" avg={avg.che}/>
          <Rating name="Value" avg={avg.val}/>
        </div>
      </div>
    </div>
  );
};

export default RatingsBox;