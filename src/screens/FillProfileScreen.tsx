import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constains/Colors';
import {Button, Header, Input} from '../components';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_WIDTH} from '../utils';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {update} from '../redux/userSlice';

const FillProfileScreen = () => {
  const [img, setImg] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation<any>();
  const handlerBack = () => {
    navigation.goBack();
  };
  const ditpatch = useDispatch<AppDisPatch>();
  const id = useSelector((state: RootState) => state.userSlice.user._id);

  const selectDoc = async () => {
    try {
      const resuls: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setImg(resuls[0].uri);
      setType(resuls[0].type);
      setName(resuls[0].name);

      console.log(resuls);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  const goToHome = () => {
    navigation.navigate('LoadingScreen');
  };
  const handlerContinue = () => {
    let user = new FormData();
    user.append('name', fullname);
    user.append('phone', phone);
    if (type) {
      user.append('image', {
        uri: img,
        type: type,
        name: name,
      });
    }
    console.log(id);
    if (check()) {
      ditpatch(update({id, user, goToHome}));
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    }
  };

  function check() {
    if (fullname === '' || phone === '') {
      return false;
    } else {
      return true;
    }
  }
  return (
    <View style={styles.container}>
      <Header onClick={handlerBack} text="Fill Your Profile" />
      <View style={styles.box1}>
        <TouchableOpacity
          style={{marginTop: 40}}
          activeOpacity={0.8}
          onPress={selectDoc}>
          <View style={styles.img}>
            <Image
              source={img ? {uri: img} : require('../assets/img/avt.jpg')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
        <Input
          extraProps={{
            placeholder: 'Full Name',
            onChangeText: setFullName,
          }}
          containerStyle={{marginTop: 50}}
        />
        <Input
          extraProps={{
            placeholder: 'Phone Number',
            onChangeText: setPhone,
          }}
          containerStyle={{marginTop: 15}}
        />
        <Button
          onClick={handlerContinue}
          colorButton={Colors.BLUE_COLOR}
          textButton="Continue"
          borderRadius={30}
          containerButton={{marginTop: 70}}
        />
      </View>
    </View>
  );
};

export default FillProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  box1: {
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 180,
  },
});
