import {SET_USER_INFO, USER_LOG_OUT} from './actions';

const initialState = {
  isUserLogIn: false,
  token: '',
};

const userInfoReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {...istate, ...action.payload};
    case USER_LOG_OUT:
      return {...istate, ...action.payload};
    default:
      return istate;
  }
};

export default userInfoReducer;
