const axios = require('axios');

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_QUES = 'ADD_QUES';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (newUser) => {
 // console.log(newUser);
  return function(dispatch){
    return axios.post('/api/login',newUser)
    .then( user => {
      //console.log('user from then', user)
      dispatch({
        type: LOGIN_USER,
        user: user.data
      });
    });
  }
}

export const logoutUser = () => {
  return function(dispatch){
    return axios.get('/api/logout')
    .then( () => {
      dispatch({
        type: LOGOUT_USER,
        user: null
      });
    });
  }
}

export const addQues = (newQues) => {
 // console.log(newUser);
  return function(dispatch){
    return axios.post('/api/questions',newQues)
    .then( user => {
      //console.log('user from then', user)
      dispatch({
        type: ADD_QUES,
        user: user.data
      });
    });
  }
}


