import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import Colors from '../constains/Colors';
import {WINDOW_WIDTH} from '../utils';
import {Icon, Input} from '../components';
import {Icons} from '../components/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {logout} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import ItemFriend from '../items/ItemFriend';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDisPatch>();
  const navigation = useNavigation<any>();
  const token = useSelector((state: RootState) => state.userSlice.user.token);
  const friend = useSelector((state: RootState) => state.friendSlice.data);
  const goToLogin = () => {
    navigation.popToTop();
  };
  const handlerLogOut = () => {
    dispatch(logout({token, goToLogin}));
  };
  const goToChat = () => {
    navigation.navigate('ChatScreen');
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
        <TouchableOpacity onPress={handlerLogOut}>
          <Icon
            type={Icons.Ionicons}
            name="md-settings-outline"
            color={Colors.WHITE_COLOR}
            size={26}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.box2}>
            <Input
              extraProps={{
                placeholder: 'Tìm kiếm',
              }}
              height={40}
              nameIcon="search"
              typeIcon={Icons.Ionicons}
              colorIcon={Colors.GRAYC_COLOR}
              sizeIcon={22}
            />
          </View>
          <View style={styles.box3}>
            {friend.map((item, index) => (
              <ItemFriend item={item} navi={goToChat} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
  box3: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
});
