import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userInfoReducer'],
};
const persistedReduce = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReduce);
const persistor = persistStore(store);

export {store, persistor};
