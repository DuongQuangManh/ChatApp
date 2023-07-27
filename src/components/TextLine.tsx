import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Colors from '../constains/Colors'
import { WINDOW_WIDTH } from '../utils'
interface textProps {
    text?: string,
    containerStyle?: any,
}
const TextLine: FC<textProps> = ({ text, ...props }) => {
    return (
        <View style={[styles.container, props.containerStyle, { borderTopWidth: text ? 0 : 1, borderTopColor: Colors.BLACK_COLOR }]}>
            {text && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.line, { marginEnd: 5 }]}></View>
                <Text style={{ color: Colors.WHITE_COLOR }}>{text}</Text>
                <View style={[styles.line, { marginStart: 5 }]}></View>
            </View>}
        </View>
    )
}

export default TextLine

const styles = StyleSheet.create({
    container: {
        width: WINDOW_WIDTH - 20,
    },
    line: {
        flex: 3,
        borderTopWidth: 1,
        borderTopColor: Colors.BLACK_COLOR
    }
})