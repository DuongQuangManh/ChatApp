import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import Colors from '../constains/Colors';
import {Button} from '../components';
import {URL, WINDOW_WIDTH} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {deleteUser, setUserPick} from '../redux/userSlice';
import {addfriend, deleteReq, deleteReqId} from '../redux/friendreqSlice';
import socketServcies from '../utils/socketService';

interface itemProps {
  item: any;
  navi?: any;
}

// check request add friend and socket io

const FriendReq: FC<itemProps> = ({item, navi}) => {
  const dispatch = useDispatch<AppDisPatch>();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const btn = useSelector((state: RootState) => {
    return state.friendreqSlice.data.some(
      (item1: any) => item1.to_user_id._id === item._id,
    );
  });
  console.log(btn);

  const handlerClickitem = () => {
    dispatch(setUserPick(item));
    navi();
  };

  const handlerAddFriend = async () => {
    const obj = {
      from_user_id: user._id,
      to_user_id: item._id,
      status_friend: false,
    };
    dispatch(addfriend({obj, token: user.token}));
    await socketServcies.emit('addfriend', item._id);
  };

  const handlerDelete = () => {
    dispatch(deleteUser(item._id));
  };
  const handlerDeleteReq = async () => {
    const obj = {
      from_user_id: user._id,
      to_user_id: item._id,
    };
    dispatch(deleteReq({obj, token: user.token}));
    await socketServcies.emit('addfriend', item._id);
  };
  return (
    <TouchableOpacity onPress={handlerClickitem}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `${URL}/uploads/${item.img}`,
          }}
          style={styles.img}
        />
        <View style={styles.box1}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.box2}>
            <Button
              colorButton={Colors.GRAY_COLOR}
              textButton="Xóa"
              widthButton={80}
              colorText={Colors.BLACK_COLOR}
              onClick={handlerDelete}
            />
            {btn ? (
              <Button
                colorButton={Colors.BLUE_COLOR}
                textButton={'Đã gửi'}
                widthButton={130}
                containerButton={{marginStart: 10}}
                onClick={handlerDeleteReq}
              />
            ) : (
              <Button
                colorButton={Colors.BLUE_COLOR}
                textButton={'Thêm bạn bè'}
                widthButton={130}
                containerButton={{marginStart: 10}}
                onClick={handlerAddFriend}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendReq;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 15,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_COLOR,
    marginTop: 8,
    borderRadius: 7,
    padding: 12,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },

  box1: {
    marginStart: 10,
  },
  text: {
    color: Colors.BLACK_COLOR,
    fontWeight: '700',
    fontSize: 20,
    marginStart: 5,
  },
  box2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
