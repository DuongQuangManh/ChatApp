import {StyleSheet, Text, View, TextInput, TextInputProps} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH} from '../utils';
import Icon, {Icons} from './Icon';
import Colors from '../constains/Colors';
interface inputProps {
  typeIcon?: any;
  nameIcon?: string;
  sizeIcon?: number;
  colorIcon?: string;
  extraProps: TextInputProps;
  width?: number;
  height?: number;
  borderRadius?: number;
  password?: boolean;
  containerStyle?: any;
  backGroudColor?: any;
  textColor?: any;
}
const Input: FC<inputProps> = ({
  extraProps,
  width = WINDOW_WIDTH - 30,
  height = 50,
  borderRadius = 8,
  backGroudColor = Colors.BLACK_COLOR,
  textColor = Colors.WHITE_COLOR,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        {width: width, height: height},
      ]}>
      {props.nameIcon && (
        <View style={styles.box1}>
          <Icon
            type={props.typeIcon}
            name={props.nameIcon}
            color={props.colorIcon}
            size={props.sizeIcon}
          />
        </View>
      )}
      <TextInput
        {...extraProps}
        placeholderTextColor={Colors.GRAYC_COLOR}
        style={[
          {
            width: width,
            height: height,
            backgroundColor: backGroudColor,
            borderRadius: borderRadius,
            paddingStart: props.nameIcon ? 40 : 10,
            color: textColor,
          },
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    position: 'absolute',
    zIndex: 2,
    start: 10,
  },
});
