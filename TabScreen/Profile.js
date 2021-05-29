import React from 'react';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {USER_LOG_OUT} from '../redux/actions';
import {useDispatch} from 'react-redux';

export default function Profile() {
  const {token, name, email, phone, location, type} = useSelector(
    (state) => state.userInfoReducer,
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#387E96',
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width,
          }}>
          <TouchableOpacity>
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="camera" size={60} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#E1E1E1',
            width: Dimensions.get('window').width,
          }}>
          <Input
            style={{marginTop: 40}}
            placeholder="Name"
            color="black"
            defaultValue={name}
            editable={false}
            leftIcon={
              <Icon
                name="user"
                size={24}
                color="#387E96"
                style={{marginTop: 40}}
              />
            }
          />
          <Input
            style={{marginTop: 20}}
            placeholder="Email"
            color="black"
            keyboardType="email-address"
            defaultValue={email}
            editable={false}
            leftIcon={
              <Icon
                name="envelope-square"
                size={24}
                color="#387E96"
                style={{marginTop: 20}}
              />
            }
          />
          <Input
            style={{marginTop: 20}}
            placeholder="Phone"
            color="black"
            keyboardType="phone-pad"
            defaultValue={phone}
            editable={false}
            leftIcon={
              <Icon
                name="phone"
                size={24}
                color="#387E96"
                style={{marginTop: 20}}
              />
            }
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.signOut}
              onPress={() => {
                dispatch({
                  type: USER_LOG_OUT,
                  payload: {
                    token: '',
                    isUserLogin: false,
                  },
                });
              }}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#E8CFCC'}}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOut: {
    backgroundColor: '#387E96',
    width: '20%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DA6454',
    borderRadius: 10,
  },
});
