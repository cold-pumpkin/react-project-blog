import jsonPlaceholder from '../apis/jsonPlaceholder';

/* Action creator ver. 1) 비동기 함수 호출, object 리턴하는 경우 (Error)
export const fetchPosts = async () => {
  const response = await jsonPlaceholder.get('/posts');

  return {
    type: 'FETCH_POSTS',
    payload: response
  };
};
*/
/*
 * Uncaught Error: Actions must be plain objects. 
 *  Instead, the actual type was: 'Promise'. 
 *  You may need to add middleware to your store setup to handle dispatching other values, 
 *  such as 'redux-thunk' to handle dispatching functions.
 *
 *  > redux-thunk : Middleware to help us make requests in a redux application.
 */

/* Error 발생 원인
1) Action Creator에서는 type & playload 프로퍼티를 갖는 plain JS object 를 리턴해야함
    - ES6 async & await 때문에 문제 발생
    - 최초 호출 시 return jsonPlaceholder.get('/posts'); 동작, request를 리턴함 (Babel 에서 확인)
    - Redux store(dispatch)에서 plain object 가 아니라고 판단, 에러 발생
2) Action이 (호출되고 dispatch 되어) Reducer에 도달할 때 까지 데이터 fetch가 완료되지 않을 수 있음 (비동기)
    - ES6 async & await 삭제하면?
    - a) Actions creator 호출됨 - action 리턴됨 - action이 모든 reducer들에게 dispatch 됨 - reducer 동작
    - b) Actions creator 호출되면서 API 호출 - 응답 받음
    - a) 걸리는 시간 < b) 걸리는 시간이므로 reducer 동작 시 데이터가 존재하지 않음
*/

/* Middleware 활용 : Redux-thunk
  ㅇ Action creator rule 확장
    1) action object 리턴 시 type 필수, payload 는 옵션 (이전과 동일)
    2) plain action object 뿐 아니라 function 리턴 가능 (-> redux-thunk 가 호출해 줌)
      - dispatch 되면 redux-thunk 가 object/function 판단
      - object 인 경우 각 reducer에게 보냄
      - function 인 경우 
        (1) dispatch & getState 매개변수로 넘기며 해당 function을 호출
            (redux store 정보에 접근할 수 있게 되고, 미래 원하는 시점에 dispatch 직접 호출 할 수 있게 돔)
        (2) 응답 답을 때 까지 대기
        (3) 응답 받으면 (매개변수로 전달 받았던) dispatch 직접 호출
        (4) plain object를 가진 새로운 action을 얻어 다시 처음 flow로 돌아가 dispatch 됨 (결국 reducer에게 보내짐)
*/
/* Action creator ver. 2) redux-thunk 활용, function 리턴하는 Action creator
export const fetchPosts = () => {
  return async (dispatch, getState) => {  // getState는 사용하지 않음. dispatch만 넘기기
    const response = await jsonPlaceholder.get('/posts');
    
    dispatch({
      type: 'FETCH_POSTS',
      payload: response
    });
  };
};
*/
// Action creator ver. 3) 코드 개선
// Action 1 : 블로그 포스트 정보 리스트 가져오기
export const fetchPosts = () => async dispatch => {  
  const response = await jsonPlaceholder.get('/posts');
  
  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data
  });
};

// Action 2 : id에 해당하는 유저 정보 가져오기
export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: 'FETCH_USER', 
    payload: response.data
  })
}