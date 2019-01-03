import React, { Component } from 'react';
import Review from './Review.jsx';
import JwPagination from 'jw-react-pagination';

const customLabels = {
  'first': '<<',
  'last': '>>',
  'previous': '<',
  'next': '>'
};

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      pageOfItems: [],
      reviewItems: [...this.props.reviews]
    }
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }
  render() {
    /* props.reviews.map((review, index) => {
      return <Review key={index} review={review} />
    }) */
    console.log('review items: ', this.state.reviewItems);
    console.log('page items: ', this.state.pageOfItems);
    return (
      <div className="reviewsContainer">
        {
          this.state.pageOfItems.map((item, index) => {
            return <Review key={index} review={item} />
          })

        }
        <JwPagination 
          items={this.state.reviewItems} 
          onChangePage={this.onChangePage} 
          pageSize={7}
          labels={customLabels}
          />
      </div>
    );
  }
};

export default Reviews;