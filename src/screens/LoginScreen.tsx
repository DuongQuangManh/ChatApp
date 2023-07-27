import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils'
import Colors from '../constains/Colors'
import { Button, TextLine } from '../components'
import { Icons } from '../components/Icon'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigation = useNavigation<any>();

    const handlerSignIn = () => {
        navigation.navigate("SignInScreen")
    }
    const handlerSignUp = () => {
        navigation.navigate("SignUpScreen")
    }
    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Image source={require("../assets/img/logo2.png")} />
            </View>
            <Text style={[styles.text, { fontSize: 25, fontWeight: '700' }]}>
                Let's You In
            </Text>
            <Button
                textButton='Facebook'
                colorButton={Colors.BLACK_COLOR}
                nameIcon='facebook'
                typeIcon={Icons.MaterialIcons}
                colorIcon='gray'
                heightButton={50}
                containerButton={{ marginTop: 20 }}
            />
            <Button
                textButton='Google'
                colorButton={Colors.BLACK_COLOR}
                nameIcon='logo-google'
                typeIcon={Icons.Ionicons}
                colorIcon='gray'
                heightButton={50}
                containerButton={{ marginTop: 10 }}

            />
            <Button
                textButton='Apple'
                colorButton={Colors.BLACK_COLOR}
                nameIcon='apple'
                typeIcon={Icons.FontAwesome}
                colorIcon='gray'
                heightButton={50}
                containerButton={{ marginTop: 10 }}

            />
            <TextLine text='or' containerStyle={{ marginTop: 50, }} />
            <Button
                textButton='Sign in with password'
                colorButton={Colors.BLUE_COLOR}
                heightButton={50}
                containerButton={{ marginTop: 10 }}
                borderRadius={30}
                onClick={handlerSignIn}
            />
            <View style={styles.box2}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity style={{ marginStart: 5 }} activeOpacity={0.7} onPress={handlerSignUp}>
                    <Text style={{ color: Colors.BLUE_COLOR }}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        alignItems: 'center'
    },
    box1: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.WHITE_COLOR
    },
    box2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    }
})