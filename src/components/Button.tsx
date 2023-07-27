import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { WINDOW_WIDTH } from '../utils'
import Colors from '../constains/Colors'
import Icon from './Icon'

interface buttonProps {
    typeIcon?: any,
    nameIcon?: string,
    sizeIcon?: number,
    colorIcon?: string,
    textButton: string,
    colorButton: string,
    widthButton?: number,
    heightButton?: number,
    colorText?: string,
    borderRadius?: number,
    containerButton?: any,
    onClick?: any,

}
const Button: FC<buttonProps> = ({ borderRadius = 10, widthButton = WINDOW_WIDTH - 20, heightButton = 45, colorText = Colors.WHITE_COLOR, ...props }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onClick}>
            <View style={[props.containerButton, styles.container, { borderRadius: borderRadius, width: widthButton, height: heightButton, backgroundColor: props.colorButton }]}>
                {props.nameIcon && <Icon type={props.typeIcon} name={props.nameIcon} size={props.sizeIcon} color={props.colorIcon} />}
                <Text style={{ color: colorText, marginStart: props.nameIcon ? 10 : 0 }}>{props.textButton}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})