import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducers';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});
// mapStateToProps 에서 state로 가져올 수 있음