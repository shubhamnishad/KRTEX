import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

export default function SignUp(props) {
  const [data, setData] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setLoading] = useState();

  const netInfo = useNetInfo();

  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regPhone = /^\d{10}$/;

  const signUpMethod = () => {
    try {
      fetch('https://uditsolutions.in/exporter/public/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          phone: contact,
          address: location,
          type: type,
          role: 'app_user',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          console.log('post', json);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
          props.navigation.navigate('StartScreen');
        });
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1, width: '100%'}}>
      <ImageBackground
        style={styles.Logo}
        source={require('../Image/SignUp.jpeg')}>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View></View>
          )}
        </View>
        <View
          style={{
            backgroundColor: 'rgba(5,52,52,0.8)',
            borderRadius: 40,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
              alignContent: 'center',
            }}
            placeholder="Name"
            underlineColorAndroid="transparent"
            onChangeText={(name) => setName(name)}
            defaultValue={name}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            placeholder="Email"
            underlineColorAndroid="transparent"
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            placeholder="Set Password"
            underlineColorAndroid="transparent"
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 20,
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(confirmPass) => setConfirmPassword(confirmPass)}
            defaultValue={confirmPassword}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            placeholder="Phone No"
            underlineColorAndroid="transparent"
            onChangeText={(cont) => setContact(cont)}
            defaultValue={contact}
            keyboardType={'number-pad'}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            placeholder="Location"
            underlineColorAndroid="transparent"
            onChangeText={(loc) => setLocation(loc)}
            defaultValue={location}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '78%',
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            placeholder="Type of user"
            underlineColorAndroid="transparent"
            onChangeText={(type) => setType(type)}
            defaultValue={type}
          />

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              if (
                name == '' ||
                email == '' ||
                password == '' ||
                confirmPassword == '' ||
                contact == '' ||
                location == '' ||
                type == ''
              ) {
                Keyboard.dismiss();
                Snackbar.show({
                  text: 'All Fields Mandatory',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (password !== confirmPassword) {
                Keyboard.dismiss();
                Snackbar.show({
                  text: 'Password doesnt match',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (regEmail.test(email) !== true) {
                Keyboard.dismiss();
                Snackbar.show({
                  text: 'Enter Valid Email',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (regPhone.test(contact) !== true) {
                Keyboard.dismiss();
                Snackbar.show({
                  text: 'Enter Valid Phone Number',
                  duration: Snackbar.LENGTH_LONG,
                });
              } else if (netInfo.isConnected == false) {
                alert('Check Internet Connection !');
              } else {
                setLoading(true);
                signUpMethod();
              }
            }}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => props.navigation.navigate('StartScreen')}>
            <Text style={{fontSize: 16, color: 'white'}}>
              Have an account? Sign In
            </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000080',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    paddingLeft: 20,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
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
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
  },
  nameView: {
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
  Logo: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
