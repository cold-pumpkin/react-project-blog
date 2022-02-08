import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends Component {

  // 렌더링 후 Post 데이터 fetch 하는 Action Creator 호출
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {  // mapStateToProps 이후 
    return (
      <div>PostList!</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts };  // reducers - combineReducers()에서 지정한 key로 state에서 꺼내오기
}

export default connect(
  mapStateToProps,
  { fetchPosts }    // Action Creators (key-value 같은 경우 생략 가능 : ES6)
)(PostList);