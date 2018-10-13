import React from 'react'
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native'

interface State {
  sec: number,
  isStart: boolean,
  interval: NodeJS.Timer | null,
}

export default class Timer extends React.Component<any, State> {

  constructor(props: State) {
    super(props)
    this.state = {
      sec: 1000,
      isStart: false,
      interval: null,
    }
  }

  tick = () => {
    this.setState({ sec: this.state.sec - 1 }, () => {
      if (this.state.sec <= 0 && this.state.interval) {
        clearInterval(this.state.interval)
        this.setState({ isStart: false })
      }
    })
  }

  start = () => {
    if (!this.state.isStart) {
      this.setState({
        interval: setInterval(this.tick, 1000),
        isStart: true,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.sec}</Text>
        <Button title='start' onPress={this.start} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})