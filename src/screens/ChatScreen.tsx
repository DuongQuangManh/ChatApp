import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../constains/Colors';
import {Button, Header, Input} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {FriendModel} from '../models';
import {ItemMessage} from '../items';
import {WINDOW_WIDTH} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {addMessage, getMessage} from '../redux/messageSlice';
import socketServcies from '../utils/socketService';

const ChatScreen = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDisPatch>();
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const room: any = useSelector(
    (state: RootState) => state.messageSlice.roomPick,
  );
  const message = useSelector((state: RootState) => {
    return state.messageSlice.data.filter((item: any) => {
      return (
        item.sender_id._id == room.friend_id._id ||
        item.receiver_id._id == room.friend_id._id
      );
    });
  });

  useEffect(() => {
    socketServcies.on('check_message', (data: any) => {
      console.log('đây là data');
      console.log(data);
      if (data === user._id) {
        console.log('đã load lại vì có commnet mới');
        dispatch(getMessage({id: user._id}));
      }
    });
  }, []);

  const handlerSend = async () => {
    const obj = {
      sender_id: room.user_id._id,
      receiver_id: room.friend_id._id,
      message: text,
    };
    dispatch(addMessage({obj}));
    await socketServcies.emit('send_message', room.friend_id._id);
    setText('');
  };
  const handlerBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header onClick={handlerBack} text={room.friend_id.name} />
      <FlatList
        inverted
        data={message}
        renderItem={item => {
          return <ItemMessage item={item} />;
        }}
        ListHeaderComponent={<View style={{height: 15, width: WINDOW_WIDTH}} />}
      />
      <View style={styles.box1}>
        <Input
          extraProps={{
            onChangeText: setText,
            placeholder: 'Nhập tin nhắn',
            value: text,
          }}
          width={((WINDOW_WIDTH - 5) * 3) / 4}
          backGroudColor={Colors.WHITE_COLOR}
          textColor={Colors.BLACK_COLOR}
        />
        <Button
          textButton="Gửi"
          colorButton={Colors.BLUE_COLOR}
          colorText={Colors.WHITE_COLOR}
          onClick={handlerSend}
          widthButton={((WINDOW_WIDTH - 50) * 1) / 4}
          containerButton={{marginStart: 5}}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 5,
  },
  box1: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
