import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../constains/Colors';
import {URL, WINDOW_WIDTH} from '../utils';
import {Button} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {setUserPick} from '../redux/userSlice';
import {changestatus, deleteReqId} from '../redux/friendreqSlice';
import {addFriend} from '../redux/friendSlice';
interface itemProps {
  item: any;
  navi?: any;
}
const FriendReceived: FC<itemProps> = ({item, navi}) => {
  const dispatch = useDispatch<AppDisPatch>();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const handlerClickitem = () => {
    // dispatch(setUserPick(item));
    navi();
  };
  const handlerAddFriend = async () => {
    const obj1 = {
      user_id: user._id,
      friend_id: item.from_user_id._id,
    };
    const obj2 = {
      user_id: item.from_user_id._id,
      friend_id: user._id,
    };
    const objcg = {
      id: user._id,
    };
    await dispatch(changestatus({id: item._id, token: user.token, obj: objcg}));
    await dispatch(addFriend({obj: obj2, id: user._id}));
    await dispatch(addFriend({obj: obj1, id: user._id}));
  };
  const handlerDelete = () => {
    const obj = {
      _id: item._id,
      to_user_id: user._id,
    };
    dispatch(deleteReqId({obj, token: user.token}));
  };
  return (
    <TouchableOpacity onPress={handlerClickitem}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `${URL}/uploads/${item.from_user_id.img}`,
          }}
          style={styles.img}
        />
        <View style={styles.box1}>
          <Text style={styles.text}>{item.from_user_id.name}</Text>
          <View style={styles.box2}>
            <Button
              colorButton={Colors.GRAY_COLOR}
              textButton="Xóa"
              widthButton={80}
              colorText={Colors.BLACK_COLOR}
              onClick={handlerDelete}
            />
            <Button
              colorButton={Colors.BLUE_COLOR}
              textButton={'Xác nhận'}
              widthButton={130}
              containerButton={{marginStart: 10}}
              onClick={handlerAddFriend}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendReceived;

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
