import React from 'react'
import { StyleSheet, Text, View, Button, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { StoreState, setProgressTime } from '../../redux/action'

type WorkState = 'InProgress' | 'Rest'

interface State {
  sec: number,
  workState: WorkState,
  loop: number
  isStart: boolean,
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
      isStart: false,
      interval: null,
    }
  }

  tick = () => {
    // secをチェック
    this.setState({ ...this.state, sec: this.state.sec - 1 }, () => {
      // secが0でループが1以上なら、toggleする
      if (this.state.sec <= 0) {
        this.toggleWorkStateOrStop()
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
        <Text>Sec:{this.state.sec}</Text>
        <Text>Loop:{this.state.loop}</Text>
        <Button title='start' onPress={this.start} />
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
    this.setState({ ...this.state, workState, sec, loop, isStart: loop === 0 })
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