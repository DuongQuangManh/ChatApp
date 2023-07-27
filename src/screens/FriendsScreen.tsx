import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../constains/Colors';
import {WINDOW_WIDTH} from '../utils';
import {BadgeIcon, Button, Icon} from '../components';
import {Icons} from '../components/Icon';
import {FriendReq} from '../items';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {get} from '../redux/userSlice';
import socketServcies from '../utils/socketService';
import {getReqReceived} from '../redux/friendreqSlice';
import {FriendModel, UserModel} from '../models';

const FriendsScreen = () => {
  const ditpatch = useDispatch<AppDisPatch>();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const friend = useSelector((state: RootState) => state.friendSlice.data);
  const data = useSelector((state: RootState) => {
    return state.userSlice.data.filter(item => {
      return item._id != user._id;
    });
  });

  function filterUsers(userList: UserModel[], friendList: FriendModel[]) {
    return userList.filter(function (user) {
      return !friendList.some(function (friend: any) {
        return friend.friend_id._id === user._id;
      });
    });
  }
  const data3 = filterUsers(data, friend);
  useEffect(() => {
    socketServcies.on('check_addfriend', (data: any) => {
      console.log('đây là data');
      console.log(data);
      if (data === user._id) {
        console.log('đã load lại vì có commnet mới');
        ditpatch(getReqReceived({id: user._id, token: user.token}));
      }
    });
  }, []);

  const navigation = useNavigation<any>();

  const count = useSelector(
    (state: RootState) => state.friendreqSlice.data_res,
  );
  const handerSearch = () => {
    navigation.navigate('SearchScreen');
  };
  const handlerGoToFriendReq = () => {
    navigation.navigate('FriendRequest');
  };
  const handlerDetails = () => {
    navigation.navigate('UserDetails');
  };
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/img/logo2.png')}
            style={{width: 40, height: 40}}
          />
          <Text style={styles.label}>BoBo</Text>
        </View>
        <TouchableOpacity onPress={handlerGoToFriendReq}>
          <BadgeIcon
            icon={
              <Icon
                type={Icons.FontAwesome}
                name="bell"
                color={Colors.WHITE_COLOR}
                size={26}
              />
            }
            badgeCount={count ? count.length : 0}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.box2}>
          <Button
            colorButton={Colors.BLUE_COLOR}
            textButton="Tìm bạn bè"
            borderRadius={5}
            heightButton={35}
            containerButton={{alignSelf: 'center'}}
            onClick={handerSearch}
          />

          <View style={styles.box3}>
            <Text
              style={[styles.colorText, {marginTop: 10, fontWeight: '700'}]}>
              Bạn bè đề xuất
            </Text>
            <View style={styles.box4}>
              {data3.map((item, index) => (
                <FriendReq item={item} key={index} navi={handlerDetails} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  box1: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.WHITE_COLOR,
    marginStart: 10,
  },
  box2: {
    flex: 1,
  },
  colorText: {
    color: Colors.WHITE_COLOR,
  },
  box3: {
    flex: 1,
    padding: 4,
  },
  box4: {
    padding: 2,
    paddingTop: 20,
    alignItems: 'center',
  },
});
