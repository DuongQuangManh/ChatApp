import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FriendsScreen, HomeScreen} from '../screens';
import {BadgeIcon, Icon} from '../components';
import {Icons} from '../components/Icon';
import {WINDOW_WIDTH} from '../utils';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constains/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDisPatch, RootState} from '../redux/store';
import {setCount} from '../redux/friendreqSlice';
const BottonTabLayout = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation() as any;
  const ditpatch = useDispatch<AppDisPatch>();
  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = '';
            let colorIcon = Colors.BACKGROUND_COLOR;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              colorIcon = focused ? Colors.BACKGROUND_COLOR : Colors.GRAY_COLOR;
            } else if (route.name === 'Friends') {
              iconName = focused ? 'md-people-sharp' : 'md-people-outline';
              colorIcon = focused ? Colors.BACKGROUND_COLOR : Colors.GRAY_COLOR;
            }

            return (
              <Icon type={Icons.Ionicons} name={iconName} color={colorIcon} />
            );
          },
          tabBarActiveTintColor: Colors.BACKGROUND_COLOR,
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: Colors.BLUE_COLOR,
          },
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen
                    name='Favorite'
                    component={FavoriteScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return <BadgeIcon badgeCount={count} icon={<Icon type={Icons.Ionicons} name={focused ? "heart" : "heart-outline"} color={focused ? Colors.BACKGROUND_COLOR : "black"} />} />
                        }
                    }}
                /> */}
        <Tab.Screen name="Friends" component={FriendsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottonTabLayout;

const styles = StyleSheet.create({
  iconcart: {
    width: 30,
    height: 30,
  },
});
