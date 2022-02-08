const postReducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};

export default postReducers;

/* Rules of Reducers
  1) undefined를 리턴해서는 안됨
    (Redux combineReducers 구현 내부에서 에러 던짐)
  2) 오직 이전의 state와 action을 활용해서 앱에서 사용될 state 혹은 data를 생성
  3) 어떤 값을 리턴할지 결정하기 위해 외부에(Api 콜, 파일, DOM, 하드디스크.. 등) 접근하면 안됨
    (오직 state, action 만 활용)
  4) 매개변수로 넘어오는 state 직접 변형(mutate)해서는 안됨
    (state 내부를 직접 변경하더라도 참조하고 있는 주소값은 그대로이므로 
    state의 변화가 없다고 인식(combineReducers 내부에서 shallow comparison), rerendering 되지 않음)
*/