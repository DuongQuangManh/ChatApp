import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChatScreen,
  FillProfileScreen,
  FriendRequest,
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  SearchScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  UserDetails,
} from '../screens';
import BottonTabLayout from './BottonTabLayout';

const StackNavi = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="FillProfileScreen" component={FillProfileScreen} />
        <Stack.Screen name="BottonTabLayout" component={BottonTabLayout} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="FriendRequest" component={FriendRequest} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavi;

const styles = StyleSheet.create({});
