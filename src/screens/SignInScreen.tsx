import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Colors from '../constains/Colors';
import {useNavigation} from '@react-navigation/native';
import {Button, ButtonIcon, Input, TextLine} from '../components';
import {Icons} from '../components/Icon';
import {WINDOW_WIDTH} from '../utils';
import {isFulfilled} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {AppDisPatch} from '../redux/store';
import {login} from '../redux/userSlice';

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const ditpatch = useDispatch<AppDisPatch>();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handlerBack = () => {
    navigation.goBack();
  };
  const handlerSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  const handlerSignIn = () => {
    const user = {
      email,
      passwd: pass,
    };
    if (check()) {
      ditpatch(login({user, goToHome, goToFill}));
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    }
  };
  const goToHome = () => {
    navigation.navigate('LoadingScreen');
  };
  const goToFill = () => {
    navigation.navigate('FillProfileScreen');
  };
  function check() {
    if (email == '' || pass == '') {
      return false;
    } else {
      return true;
    }
  }
  return (
    <View style={styles.container}>
      <Header onClick={handlerBack} />
      <Text style={styles.label}>Login to your Account</Text>
      <View style={styles.box1}>
        <Input
          extraProps={{
            placeholder: 'Email',
            onChangeText: setEmail,
          }}
          nameIcon="email"
          typeIcon={Icons.MaterialIcons}
          sizeIcon={20}
          colorIcon={Colors.GRAY_COLOR}
          containerStyle={{marginTop: 45}}
        />
        <Input
          extraProps={{
            placeholder: 'Password',
            secureTextEntry: true,
            onChangeText: setPass,
          }}
          nameIcon="lock"
          typeIcon={Icons.FontAwesome}
          sizeIcon={20}
          colorIcon={Colors.GRAY_COLOR}
          containerStyle={{marginTop: 10}}
        />
        <Button
          colorButton={Colors.BLUE_COLOR}
          textButton="Sign In"
          containerButton={{marginTop: 50}}
          borderRadius={50}
          onClick={handlerSignIn}
        />
        <TouchableOpacity style={{marginTop: 20}} activeOpacity={0.7}>
          <Text style={styles.forgot}>Forgot the password?</Text>
        </TouchableOpacity>
        <TextLine text="or continue with" containerStyle={{marginTop: 45}} />
        <View style={styles.box2}>
          <ButtonIcon
            nameIcon="facebook"
            typeIcon={Icons.MaterialIcons}
            colorIcon={Colors.GRAY_COLOR}
          />
          <ButtonIcon
            nameIcon="logo-google"
            typeIcon={Icons.Ionicons}
            colorIcon={Colors.GRAY_COLOR}
          />
          <ButtonIcon
            nameIcon="apple"
            typeIcon={Icons.FontAwesome}
            colorIcon={Colors.GRAY_COLOR}
          />
        </View>
        <View style={styles.box3}>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity
            style={{marginStart: 5}}
            activeOpacity={0.7}
            onPress={handlerSignUp}>
            <Text style={{color: Colors.BLUE_COLOR}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  label: {
    fontSize: 35,
    color: Colors.WHITE_COLOR,
    width: (WINDOW_WIDTH / 4) * 3,
    fontWeight: '700',
    marginStart: 20,
    marginTop: 45,
  },
  box1: {
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
  forgot: {
    fontSize: 16,
    color: Colors.BLUE_COLOR,
  },
  box2: {
    width: WINDOW_WIDTH - 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  text: {
    color: Colors.WHITE_COLOR,
  },
  box3: {
    width: WINDOW_WIDTH,
    top: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
