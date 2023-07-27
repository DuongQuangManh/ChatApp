import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Icon from './Icon'
import Colors from '../constains/Colors'
interface btnProps {
    nameIcon: string,
    typeIcon?: any,
    colorIcon?: string,
    sizeIcon?: number,
    onClick?: any,
    containerStyle?: any
    width?: number,
    height?: number,
    borderRadius?: number
}
const ButtonIcon: FC<btnProps> = ({ width = 70, height = 60, borderRadius = 12, ...props }) => {
    return (
        <TouchableOpacity onPress={props.onClick} activeOpacity={0.7}>
            <View style={[styles.container, { width: width, height: height, borderRadius: borderRadius }]}>
                <Icon type={props.typeIcon} name={props.nameIcon} color={props.colorIcon} size={props.sizeIcon} />
            </View>
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLACK_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }
})