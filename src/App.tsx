import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import Timer from './components/timer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'

export default class App extends React.Component {
  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Timer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
