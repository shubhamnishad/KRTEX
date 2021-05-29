import {combineReducers} from 'redux';
import userInfoReducer from './reducer';

const rootReducer = combineReducers({
  //   themeReducer: themeReducer,
  userInfoReducer,
});

export default rootReducer;
