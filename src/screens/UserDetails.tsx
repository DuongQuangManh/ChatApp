import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Button, Header} from '../components';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constains/Colors';
import {URL, WINDOW_WIDTH} from '../utils';

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.userSlice.user_pick);
  const navigation = useNavigation<any>();
  const handlerBack = () => {
    navigation.goBack();
  };
  const handlerAddfriend = () => {};
  return (
    <View style={styles.container}>
      <Header text={user.name} onClick={handlerBack} />
      <View style={styles.box1}>
        <Image
          source={{uri: `${URL}/uploads/${user.img}`}}
          style={styles.img}
        />
        <View style={styles.box2}>
          <Text style={[styles.colortext, styles.name]}>{user.name}</Text>
          <Button
            textButton="Thêm bạn bè"
            colorButton={Colors.BLUE_COLOR}
            colorText={Colors.WHITE_COLOR}
            onClick={handlerAddfriend}
            widthButton={WINDOW_WIDTH - 50}
            containerButton={{marginTop: 20}}
          />
        </View>
        <View style={styles.box3}>
          <Text style={[styles.colortext, {fontSize: 17, fontWeight: '600'}]}>
            Thông tin liên hệ
          </Text>
          <View style={styles.box4}>
            <Text style={[styles.colortext, {fontWeight: '700'}]}>
              Số điện thoại:{'  '}
              <Text style={{fontWeight: '500', fontSize: 19}}>
                {user.phone}
              </Text>
            </Text>
            <Text style={[styles.colortext, {fontWeight: '700'}]}>
              Email:{'  '}
              <Text style={{fontWeight: '500', fontSize: 19}}>
                {user.email}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  box1: {
    flex: 1,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 180,
    alignSelf: 'center',
    marginTop: 30,
  },
  colortext: {
    color: Colors.WHITE_COLOR,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  box2: {
    alignItems: 'center',
    paddingTop: 20,
  },
  box3: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  box4: {
    padding: 10,
  },
});
