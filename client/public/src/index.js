import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsApp from './components/ReviewsApp.jsx';
window.ReviewsApp = ReviewsApp;

ReactDOM.render(<ReviewsApp />, document.getElementById('reviews'));