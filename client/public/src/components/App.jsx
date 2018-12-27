import React, { Component } from 'react';
import axios from 'axios';

import Reviews from './Reviews.jsx';

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
    
    if (!path.match(/^\/[0-9]+$/)) {
      path = '/1';
    }
    console.log('path: ', path);
    axios.get(`${localUrl}/reviews${path}`)
      .then(res => res.data)
      .then(res => {
        console.log('res: ', res);
        this.setState({ data: res });
      });
  }

  render() {
    console.log('state: ', this.state);
    if (this.state.data) {
      const { reviews, ratings } = this.state.data;
      console.log('reviews: ', reviews);
    }
    return (
      this.state.data ? (
        <div>
          <Reviews reviews={this.state.data.reviews}/>
        </div>
      ) : (
        <div>
          reviews pending...
        </div>
      )
    )
  }
}

export default App;