import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import StackNavi from './src/navigations'
import { store } from './src/redux/store'


const App = () => {
  return (
    <Provider store={store}>
      <StackNavi />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})