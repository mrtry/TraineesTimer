import React from 'react'
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { StoreState, setProgressTime } from '../../redux/action'

type WorkState = 'InProgress' | 'Rest'

interface State {
  sec: number,
  workState: WorkState,
  loop: number
  isProgress: boolean,
  interval: NodeJS.Timer | null,
}

type Props = StoreState

class Timer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      sec: props.progressTime,
      workState: 'InProgress',
      loop: props.loop,
      isProgress: false,
      interval: null,
    }
  }

  tick = () => {
    this.setState({ ...this.state, sec: this.state.sec - 1 }, () => {
      if (this.state.sec <= 0) {
        this.toggleWorkStateOrStop()
      }
    })
  }

  start = () => {
    if (!this.state.isProgress) {
      this.setState({
        interval: setInterval(this.tick, 1000),
        isProgress: true,
      })
    }
  }

  reset = () => {
    this.setState({
      sec: this.props.progressTime,
      workState: 'InProgress',
      loop: this.props.loop,
      isProgress: false,
      interval: null,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sec:{this.state.sec}</Text>
        <Text>Loop:{this.state.loop}</Text>
        <Button title={this.state.loop === 0 ? 'Reset' : 'Start'} onPress={this.state.loop === 0 ? this.reset : this.start} />
      </View>
    )
  }

  toggleWorkStateOrStop = () => {
    const workState = this.state.workState === 'InProgress' ? 'Rest' : 'InProgress'
    const sec = workState === 'InProgress' ? this.props.progressTime : this.props.restTime
    const loop = workState === 'InProgress' ? this.state.loop - 1 : this.state.loop

    if (loop === 0) {
      if (this.state.interval) clearInterval(this.state.interval)
    }
    this.setState({ ...this.state, workState, sec, loop, isProgress: loop === 0 })
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

function mapStateToProps(state: StoreState): StoreState {
  return state
}

export default connect(mapStateToProps)(Timer)