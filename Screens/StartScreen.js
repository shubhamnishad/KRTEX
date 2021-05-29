import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SET_USER_INFO} from '../redux/actions';
import Snackbar from 'react-native-snackbar';
import {useNetInfo} from '@react-native-community/netinfo';

const {width} = Dimensions.get('window').width;
const {height} = Dimensions.get('window').height;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function StartScreen(props) {
  const [isVisible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();

  const netInfo = useNetInfo();

  let signUp = (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
      }}>
      <ImageBackground
        style={styles.Logo}
        source={require('../Image/SignUp.jpeg')}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.5,
            marginTop: 60,
          }}>
          <Image
            style={{width: '100%', height: 230, resizeMode: 'center'}}
            source={require('../Image/Logo.png')}
          />
        </View>

        {/* <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View></View>
          )}
        </View> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View></View>
          )}
          <View
            style={{
              backgroundColor: 'rgba(5,52,52,0.8)',
              // flex: 0.5,
              borderRadius: 40,
              width: '80%',
              justifyContent: 'center',
            }}>
            <View style={styles.emailView}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
              />
            </View>

            <View style={styles.passwordView}>
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => setPassword(password)}
                defaultValue={password}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                if (email == '' || password == '') {
                  Keyboard.dismiss();
                  Snackbar.show({
                    text: 'All Fields Mandatory',
                    duration: Snackbar.LENGTH_LONG,
                  });
                } else if (regEmail.test(email) !== true) {
                  Keyboard.dismiss();
                  Snackbar.show({
                    text: 'Enter Valid Email',
                    duration: Snackbar.LENGTH_LONG,
                  });
                } else if (netInfo.isConnected == false) {
                  alert('Check Internet Connection !');
                } else {
                  Keyboard.dismiss();
                  setLoading(true);
                  signInButtonPress();
                }
              }}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{fontSize: 15, color: 'white'}}>
                Dont Have an account? Sign Up
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
  let signInButtonPress = () => {
    const emailValue = email;
    const passwordValue = password;

    try {
      fetch('https://uditsolutions.in/exporter/public/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('data ############', json);

          if (json?.data) {
            Snackbar.show({
              text: json?.data,
              duration: Snackbar.LENGTH_INDEFINITE,
              action: {
                text: 'OK',
                textColor: 'green',
                onPress: () => {
                  Snackbar.dismiss();
                },
              },
            });
            setLoading(false);
            return;
          }
          if (json) {
            const {name, address, email, phone, type} = json?.user;
            dispatch({
              type: SET_USER_INFO,
              payload: {
                token: json?.success?.token,
                isUserLogin: true,
                name,
                address,
                email,
                phone,
                type,
              },
            });
            setLoading(false);
          }
        })
        .catch((error) => console.error(error));
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* {isVisible === true ? Splash_Screen : signUp} */}
      {signUp}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 30,
  },
  passwordView: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: '80%',
    height: '12%',
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
    height: '12%',
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
