import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../constains/Colors';
import {Header} from '../components';
import {useNavigation} from '@react-navigation/native';
import {FriendReceived, FriendReq} from '../items';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const FriendRequest = () => {
  const data = useSelector((state: RootState) => state.friendreqSlice.data_res);

  const navigation = useNavigation<any>();
  const handlerBack = () => {
    navigation.goBack();
  };
  const handlerDetails = () => {
    navigation.navigate('UserDetails');
  };
  return (
    <View style={styles.container}>
      <Header onClick={handlerBack} text="Lời mời kết bạn" />
      <ScrollView>
        <View style={styles.box1}>
          {data.map((item, index) => (
            <FriendReceived item={item} key={index} navi={handlerDetails} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  box1: {
    flex: 1,
    alignItems: 'center',
  },
});
