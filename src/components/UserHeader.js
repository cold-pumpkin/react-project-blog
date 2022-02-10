import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends Component {
  componentDidMount() {
    // 컴포넌트 마운트 후 prop로 넘어온 userId로 fetchUser 액션 호출 
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const user = this.props.users.find(user => user.id === this.props.userId);
    
    if (!user)
      return null;

    return <div className='header'>{user.name}</div>;
  }
}

const mapStateToProps = (state) => {
  return { users : state.users };
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);