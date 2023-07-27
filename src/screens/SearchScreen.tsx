import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constains/Colors'
import { Header } from '../components'
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const handlerBack = () =>{
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <Header onClick={handlerBack} text='Search'/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.BACKGROUND_COLOR
    }
})