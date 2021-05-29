import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StartScreen from '../Screens/StartScreen';
import SignUp from '../Screens/SignUp';
import HomeScreen from '../Screens/HomeScreen';
import Category1 from '../ProductList/Category1';

import Profile from '../TabScreen/Profile';
import Rates from '../TabScreen/Rates';
import {useSelector} from 'react-redux';
import ReadBlog from '../Screens/ReadBlog';
import TodaysDeal from '../TabScreen/TodaysDeal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      barStyle={{
        backgroundColor: '#f5f5f5',
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        name="Profile"
        component={Profile}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Rates',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="currency-inr"
              color={color}
              size={26}
            />
          ),
        }}
        name="Rates"
        component={Rates}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Todays Deal',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={26} />
          ),
        }}
        name="TodaysDeal"
        component={TodaysDeal}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const {isUserLogin} = useSelector((state) => state.userInfoReducer);
  console.log('state login', isUserLogin);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isUserLogin ? (
          <>
            <Stack.Screen name="HomeScreen" component={MyTabs} />
            <Stack.Screen name="Rates" component={Rates} />
            <Stack.Screen name="Category1" component={Category1} />
            <Stack.Screen name="ReadBlog" component={ReadBlog} />
          </>
        ) : (
          <>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
