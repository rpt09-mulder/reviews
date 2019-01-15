import React from 'react';
import axios from 'axios';
import styles from '../styles/searchStatement.styles.css';

const SearchStatement = (props) => {
  const { reviews, handleState , searchText} = props;
  let line, guestStatement;
  const guests = reviews.length;
  const searchSpan = <span className={styles.searchWords}>{searchText}</span>;

  const handleClick = () => {
    handleState('searchText', '');
    const id = window.location.pathname.slice(0, -1) || '/1';
    const url = `/reviews${id}?search=false`;
    axios.get(url)
      .then(res => res.data)
      .then(res => {
        handleState('searchText', '');
        handleState('reviews', res.reviews);
        handleState('keyWords', []);
      });
  }

  if (guests) {
    if (guests > 1) {
      guestStatement = (`${guests} guests have mentioned `);
    } 
    if (guests === 1) {
      guestStatement = (`${guests} guest has mentioned `);
    }

    line = (
      <div className={styles.lineContainer}>
        <div className={styles.line}>
        </div>
      </div>
    );
  } else {
    guestStatement = `None of our guests have mentioned `;
    line = null;
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.statement}>
          <span className={styles.statementText}>
          { guestStatement }
          "<span className={styles.searchWords}>{searchText}</span>"
          </span>
        </div>
        <div className={styles.backStatement}>
          <span className={styles.backStatementText}>
            <button 
              type="button" 
              className={styles.button}
              aria-busy="false"
              onClick={handleClick}>
              Back to all reviews
            </button>
          </span>
        </div>
      </div>
      {line}
    </div>
  )
};

export default SearchStatement;