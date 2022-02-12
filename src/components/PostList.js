import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './UserHeader';

class PostList extends Component {

  // 렌더링 후 Post 데이터 fetch 하는 Action Creator 호출
  componentDidMount() {
    //this.props.fetchPosts();
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className='item' key={post.id}>
          <i className='large middle aligned icon user' />
          <div className='content'>
            <div className='description'>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {  // mapStateToProps 이후 
    return (
      <div className='ui relaxed divided list'>{this.renderList()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts };  // reducers - combineReducers()에서 지정한 key로 state에서 꺼내오기
}

export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }    // Action Creators (key-value 같은 경우 생략 가능 : ES6)
)(PostList);