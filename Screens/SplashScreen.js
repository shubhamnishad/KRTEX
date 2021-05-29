import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        source={require('../Image/Logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  emailView: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: '80%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 30,
  },
  passwordView: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: '80%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 30,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    paddingLeft: 20,
  },
  buttonContainer: {
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    borderRadius: 30,
    marginLeft: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
  },
  Logo: {
    width: Dimensions.get('window').width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  splashViewImage: {
    opacity: 1,
  },
  tinyLogo: {
    width: Dimensions.get('window').width,
  },
});
