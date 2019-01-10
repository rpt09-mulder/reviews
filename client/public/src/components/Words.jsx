import React from 'react';
import Word from './Word.jsx';

const Words = ({ text, keyWords, className}) => {
  return (
    <div className={className}>
      {
        text.split(' ').map((word, index) => {
          return (
            <Word 
              word={word}
              keyWords={keyWords}
              key={index}
              index={index}/>
          )
        })
      }
    </div>
  );
}

export default Words;