import React from 'react';
import Word from './Word.jsx';

const Words = (props) => {
  const {text, keyWords, className} = props;
  return (
    <div className={className}>
      {
        keyWords.length ? (
          text.split(' ').map((word, index) => {
            return (
              <Word 
                word={word}
                keyWords={keyWords}
                key={index}
                index={index}/>
            )
          })
        ) : (
          text
        )
      }
    </div>
  );
}

export default Words;