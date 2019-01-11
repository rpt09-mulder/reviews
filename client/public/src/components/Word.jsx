import React from 'react';
import styles from '../styles/word.styles.css';

const Word = ({ word, keyWords, index }) => {
  const keyWordSet = new Set(keyWords);
  const className = keyWordSet.has(word) ? 'strong' : ''
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