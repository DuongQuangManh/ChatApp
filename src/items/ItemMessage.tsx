import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import Colors from '../constains/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {URL, WINDOW_WIDTH} from '../utils';

interface itemProps {
  item?: any;
}
const ItemMessage: FC<itemProps> = ({item}) => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  console.log(item);
  const isMe = item.item.sender_id._id === user._id;
  const containerStyleMess = isMe
    ? styles.rightContainerMess
    : styles.leftContainerMess;
  const containerStyle = isMe ? styles.rightContainer : styles.leftContainer;
  const textStyle = isMe ? styles.rightText : styles.leftText;

  return (
    <View style={[containerStyle, styles.box1]}>
      {!isMe ? (
        <Image
          source={{uri: `${URL}/uploads/${item.item.receiver_id.img}`}}
          style={styles.img}
        />
      ) : null}
      <View style={[styles.container, containerStyleMess]}>
        <Text style={textStyle}>{item.item.message}</Text>
      </View>
    </View>
  );
};

export default ItemMessage;

const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    marginStart: 10,
    alignSelf: 'center',
  },
  leftContainer: {
    alignSelf: 'flex-start',
  },
  rightContainer: {
    alignSelf: 'flex-end',
  },
  leftContainerMess: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.BLACK_COLOR,
  },
  rightContainerMess: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.BLUE_COLOR,
  },
  leftText: {
    color: Colors.WHITE_COLOR,
    fontSize: 16,
  },
  rightText: {
    color: Colors.WHITE_COLOR,
    fontSize: 16,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 180,
  },
});
