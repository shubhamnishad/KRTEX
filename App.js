import React from 'react';
import MainNavigator from './MainNavigator/MainNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import SplashScreen from './Screens/SplashScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<SplashScreen />}
        persistor={persistor}
        onBeforeLift={() =>
          new Promise((resolve) => setTimeout(resolve, 3000))
        }>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}
