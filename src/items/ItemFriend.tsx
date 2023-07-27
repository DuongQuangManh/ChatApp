import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Colors from '../constains/Colors';
import {URL, WINDOW_WIDTH} from '../utils';
import {useDispatch} from 'react-redux';
import {AppDisPatch} from '../redux/store';
import {setRoomChat} from '../redux/messageSlice';

interface itemProps {
  item: any;
  navi?: any;
}
const ItemFriend: FC<itemProps> = ({item, navi}) => {
  const dispatch = useDispatch<AppDisPatch>();

  const handlerClick = () => {
    dispatch(setRoomChat(item));
    navi();
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlerClick}>
      <View style={styles.container}>
        <Image
          source={{uri: `${URL}/uploads/${item.friend_id.img}`}}
          style={styles.img}
        />
        <Text style={styles.name}>{item.friend_id.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemFriend;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: WINDOW_WIDTH - 20,
    padding: 10,
    flexDirection: 'row',
    borderColor: Colors.GRAYC_COLOR,
    borderWidth: 1,
    marginBottom: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 180,
  },
  name: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.WHITE_COLOR,
    marginStart: 10,
  },
});
