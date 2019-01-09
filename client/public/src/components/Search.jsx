import React, { Component } from 'react';
import styles from '../styles/search.styles.css';
import stopWords from '../../../../utilities/stopWords.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchWords = this.searchWords.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  searchWords() {
    const searchWords = this.state.value.split(' ');
    const stopWordsSet = new Set(stopWords);
    const filteredWords = searchWords.filter(word => {
      return !stopWordsSet.has(word);
    });
    console.log('filteredWords: ', filteredWords);
    this.props.handleState('keyWords', filteredWords);
  }

  handleSubmit(event) {
    if (event.key !== 'Enter') return;
    this.searchWords();
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.searchContainerInner}>
          <div className={styles.searchI}>
            <div className={styles.searchII}>
              <div className={styles.searchIII}>
                <div className={styles.searchSymContainer}>
                  <div className={styles.searchSymOuter}>
                    <div className={styles.searchSym}>
                      <div className={styles.searchSymInner}>
                        <svg 
                          viewBox="0 0 24 24" 
                          role="presentation" 
                          aria-hidden="true" 
                          focusable="false"
                          className={styles.svg}>
                          <path 
                            d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1" 
                            fillRule="evenodd">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.searchBarContainer}>
                  <div className={styles.form} onSubmit={this.handleSubmit}>
                    <input 
                      className={styles.input} 
                      type="text" 
                      value={this.state.value}
                      onChange={this.handleChange} 
                      onKeyPress={this.handleSubmit} 
                      placeholder="Search reviews"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;