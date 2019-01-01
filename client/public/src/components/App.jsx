import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/app.styles.css';
import reviewStyles from '../styles/review.styles.css';

import Reviews from './Reviews.jsx';
import ReviewsHeader from './ReviewsHeader.jsx';
import RatingsBox from './RatingsBox.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentWillMount() {
    // const ebUrl = 'http://firebnb-reviews.8di9c2yryn.us-east-1.elasticbeanstalk.com'; 
    const localUrl = 'http://localhost:3003'
    let path = window.location.pathname;
    
    if (!path.match(/^\/[0-9]+/)) {
      path = '/1';
    }
    axios.get(`${localUrl}/reviews${path}`)
      .then(res => res.data)
      .then(res => {
        this.setState({ data: res });
      });
  }

  render() {
    if (this.state.data) {
      const { reviews, ratings } = this.state.data;
    }
    return (
      this.state.data ? (
        <div className={styles.reviews}>
          <ReviewsHeader
            reviews={this.state.data.reviews}
            average={this.state.data.ratings.avg}
          />
          <RatingsBox avg={this.state.data.ratings}/>
          <Reviews reviews={this.state.data.reviews} />
        </div>
      ) : (
        <div>
          No reviews
        </div>
      )
    )
  }
}

export default App;