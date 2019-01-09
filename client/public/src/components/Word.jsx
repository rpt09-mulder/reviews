import React from 'react';
import styles from '../styles/word.styles.css';

const Word = ({ word, keyWords, index }) => {
  const keyWordSet = new Set(keyWords);
  const className = keyWordSet.has(word) ? 'strong' : ''
  return (
    <span className={styles[className]}>
      {
        index < 1 ? (
          <span>{word}</span>
        ) : (
          <span>
            &nbsp;
            {word}
          </span>
        )
      }
    </span>
  );
}

export default Word;