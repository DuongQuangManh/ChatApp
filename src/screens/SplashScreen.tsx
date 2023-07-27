import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constains/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {AppDisPatch} from '../redux/store';
import {setUser} from '../redux/userSlice';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const ditpatch = useDispatch<AppDisPatch>();
  const checkLogin = async () => {
    const res: any = await AsyncStorage.getItem('user');
    const user = await JSON.parse(res);

    if (user) {
      if (user.token) {
        await ditpatch(setUser(user));
        setTimeout(() => {
          navigation.navigate('LoadingScreen');
        }, 1000);
      }
    } else {
      setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, 2000);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/logo.jpg')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
});
