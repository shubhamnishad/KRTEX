import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import IGStoryCircle from 'react-native-instagram-story-circle';
import {useNavigation} from '@react-navigation/native';
import {apiRequest} from '../api/apiHelper';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';

const CircleImageSlider = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {token} = useSelector((state) => state.userInfoReducer);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected == false) {
      alert('Check Internet Connection !');
    } else {
      const header = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      apiRequest(
        'GET',
        'https://uditsolutions.in/exporter/public/api/categories',
        {},
        header,
      )
        .then((json) => {
          console.log('data received', json);
          setData(json);
          setLoading(false);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);
  if (isLoading == true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
        <Text> Loading..</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 2,
          width: Dimensions.get('window').width,
        }}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          {netInfo.isConnected
            ? data &&
              data.length > 0 &&
              data.map((item) => {
                return (
                  <View
                    key={item.id}
                    style={{marginLeft: 5, justifyContent: 'center'}}>
                    <IGStoryCircle
                      {...item}
                      source={{
                        uri: item.image,
                      }}
                      onPress={() => {
                        navigation.navigate('Category1', {
                          name: item.name,
                          id: item.id,
                          uri: item.image,
                        });
                      }}
                      size={68}
                    />
                    <Text {...item} style={{color: 'black', marginLeft: 5}}>
                      {item.name}
                    </Text>
                  </View>
                );
              })
            : alert('Check Internet')}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default CircleImageSlider;
