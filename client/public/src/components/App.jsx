import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/app.styles.css';

import Reviews from './Reviews.jsx';
import ReviewsHeader from './ReviewsHeader.jsx';
import RatingsBox from './RatingsBox.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      reviews: null,
      keyWords: []
    };
    this.handleState = this.handleState.bind(this);
  }
  componentDidMount() {
    // const ebUrl = 'http://firebnb-reviews.8di9c2yryn.us-east-1.elasticbeanstalk.com'; 
    const localUrl = 'http://localhost:3003';
    let path = window.location.pathname;
    
    if (!path.match(/^\/[0-9]+/)) {
      path = '/1';
    }
    axios.get(`${localUrl}/reviews${path}`)
      .then(res => res.data)
      .then(res => {
        console.log('res: ', res);
        this.setState({ 
          ratings: res.ratings,
          reviews: res.reviews
        });
      });
  }

  handleState(prop, newState) {
    this.setState({[prop]: newState});
  }

  render() {
    if (this.state.data) {
      const { reviews, ratings } = this.state;
    }
    return (
      this.state.reviews ? (
        <div className={styles.reviews}>
          <ReviewsHeader
            reviews={this.state.reviews}
            average={this.state.ratings.avg}
            handleState={this.handleState}/>
          <RatingsBox avg={this.state.ratings}/>
          <Reviews 
            reviews={this.state.reviews} 
            keyWords={this.state.keyWords}/>
        </div>
      ) : (
        <div>
          No reviews
        </div>
      )
    );
  }
}

export default App;