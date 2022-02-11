import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends Component {
  componentDidMount() {
    // 컴포넌트 마운트 후 prop로 넘어온 userId로 fetchUser 액션 호출 
    this.props.fetchUser(this.props.userId);
  }

  render() {
    //const user = this.props.users.find(user => user.id === this.props.userId);  -> mapStateToProps에서 수행
    const { user } = this.props;
    
    if (!user)
      return null;

    return <div className='header'>{user.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {  // ownProps는 PostList에서 UserHeader 컴포넌트 호출 시 넘긴 props를 참조
  // 재사용성 향상을 위해 해당하는 user 만 렌더링 하도록 pre-calculation
  return { user : state.users.find(user => user.id === ownProps.userId) };
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);