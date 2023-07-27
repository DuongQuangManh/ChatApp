import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constains/Colors';
import {Loading} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {get} from '../redux/userSlice';
import {getFriend} from '../redux/friendSlice';
import {getRedSended, getReqReceived} from '../redux/friendreqSlice';
import socketServcies from '../utils/socketService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMessage} from '../redux/messageSlice';

const LoadingScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDisPatch>();
  const user = useSelector((state: RootState) => state.userSlice.user);

  // useEffect(() => {
  //   socketServcies.initializeSocket();
  //   ditpatch(get());
  //   ditpatch(getFriend());
  //   ditpatch(getRedSended({id: user._id, token: user.token}));
  //   ditpatch(getReqReceived({id: user._id, token: user.token}));
  //   navigation.navigate('BottonTabLayout');
  // }, []);
  const fetchdata = async () => {
    const u: any = await AsyncStorage.getItem('user');
    const user = await JSON.parse(u);
    Promise.all([
      dispatch(get()),
      dispatch(getFriend(user._id)),
      dispatch(getRedSended({id: user._id, token: user.token})),
      dispatch(getReqReceived({id: user._id, token: user.token})),
      dispatch(getMessage({id: user._id})),
    ]).then(() => {
      navigation.navigate('BottonTabLayout');
    });
  };
  useEffect(() => {
    console.log('-----user loading');
    socketServcies.initializeSocket();
    fetchdata();
    console.log(user);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/logo.jpg')} style={styles.img} />
      <Loading />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 350,
    height: 300,
    marginTop: 50,
  },
});
