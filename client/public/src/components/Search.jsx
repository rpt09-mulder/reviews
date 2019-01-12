import React, { Component } from 'react';
import styles from '../styles/search.styles.css';
import stopWords from '../../../../utilities/stopWords.js';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      typing: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchWords = this.searchWords.bind(this);
    this.handleState = this.handleState.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleState(prop, newState) {
    this.setState({[prop] : newState});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  searchWords() {
    const searchWords = this.state.value.toLowerCase().split(' ');
    const stopWordsSet = new Set(stopWords);
    const filteredWords = searchWords.filter(word => {
      return !stopWordsSet.has(word);
    });
    const id = window.location.pathname.slice(0, -1) || '/1';
    const url = `/reviews${id}?search=true&keyWords=${filteredWords}`;
    axios.get(url)
      .then(res => res.data)
      .then(res => {
        this.props.handleState('reviews', res.reviews);
        this.props.handleState('keyWords', filteredWords);
      });
    // this.props.handleState('keyWords', filteredWords);
  }

  clearSearch() {
    const id = window.location.pathname.slice(0, -1) || '/1';
    const url = `/reviews${id}?search=false`;
    axios.get(url)
      .then(res => res.data)
      .then(res => {
        this.handleState('value', '');
        this.props.handleState('reviews', res.reviews);
        this.props.handleState('keyWords', []);
      });
  }

  handleSubmit(event) {
    if (event.key !== 'Enter') return;
    this.searchWords();
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     this.handleState('typing', false);
    }
  }

  render() {
    const clearContainer = this.state.typing ? styles.clearContainerOn : styles.clearContainerOff;
    const borderColor = this.state.typing ? styles.searchIIOn : styles.searchIIOff;
    return (
      <div className={styles.searchContainer} ref={this.setWrapperRef}>
        <div className={styles.searchContainerInner}>
          <div className={styles.searchI}>
            <div className={`${styles.searchII} ${borderColor}`}>
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
                      onClick={() => this.handleState('typing', true)}
                      onKeyPress={this.handleSubmit} 
                      placeholder="Search reviews"/>
                      <div className={clearContainer}>
                        <div className={styles.clearContainerInner}>
                          <button 
                            className={styles.clearButton} 
                            type="button"
                            onClick={this.clearSearch}>
                            <svg 
                              viewBox="0 0 24 24" 
                              role="img" 
                              aria-label="Clear Input" 
                              focusable="false"
                              className={styles.clearSvg}>
                              <path 
                                d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" 
                                fillRule="evenodd">
                              </path>
                            </svg>
                          </button>
                        </div>
                      </div>
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