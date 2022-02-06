import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends Component {

  // 렌더링 후 Post 데이터 fetch 하는 Action Creator 호출
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>PostList!</div>
    );
  }
}

export default connect(
  null,           // 현재 Redux store에서 관리할 state 가 없는 상태
  { fetchPosts }  // Action Creators (key-value 같은 경우 생략 가능 : ES6)
)(PostList);