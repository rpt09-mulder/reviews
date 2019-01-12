import React from 'react';
import Word from './Word.jsx';

const Words = (props) => {
  const {text, keyWords, className} = props;
  let words;
  if (keyWords.length) {
    words = text.split(' ').map((word, index) => {
      return (
        <Word 
          word={word}
          keyWords={keyWords}
          key={index}
          index={index}/>
      )
    })
  } else {
    words = text;
  }

  return (
    <div className={className}>
      { words }
    </div>
  );
}

export default Words;