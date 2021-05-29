import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import CircleImageSlider from '../Components/CircleImageSlider';
import CardElement from '../ReactNativeElements/CardElement';

const {width} = Dimensions.get('window').width;
const {height} = Dimensions.get('window').height;

export default function HomeScreen(props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 15,
            padding: 5,
            color: 'black',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          KRTEX
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <CircleImageSlider></CircleImageSlider>
      </View>
      <View style={styles.bottomContainer}>
        <ImageBackground
          style={styles.Logo}
          source={require('../Image/rawyarn.jpeg')}>
          <CardElement></CardElement>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'pink',
    width: width,
    height: height,
  },
  topContainer: {
    flex: 0.6,
    backgroundColor: '#e6e6fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1.2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 6,
    backgroundColor: '#e6e6fa',
  },
  Logo: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
});
