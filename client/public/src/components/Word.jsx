import React from 'react';
import styles from '../styles/word.styles.css';

const Word = ({ word, keyWords, index }) => {
  const keyWordSet = new Set(keyWords);
  let className = '';
  keyWords.forEach(keyWord => {
    let regex = new RegExp('/' + keyWord + '/');
    if (word.toLowerCase().match(keyWord)) {
      className = 'strong';
    }
  });
  return (
    <span className={styles[className]}>
      {
        <span className={styles.word}>
          {word}
          &nbsp;
        </span>
      }
    </span>
  );
}

export default Word;