import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { WINDOW_WIDTH } from '../utils'
import Icon, { Icons } from './Icon'
import Colors from '../constains/Colors'


interface headerProps {
    text?: string,
    onClick?: any
}
const Header: FC<headerProps> = ({ text, onClick }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={onClick}>
                <Icon type={Icons.Ionicons} name='chevron-back-outline' color={Colors.WHITE_COLOR} />
            </TouchableOpacity>
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 19,
        fontWeight: '700',
        color: Colors.WHITE_COLOR,
        marginStart: 10,
        alignSelf:'center',
    }
})