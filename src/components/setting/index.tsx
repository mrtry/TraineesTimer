import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

interface Item {
  title: string,
  time: string,
}

export default class Timer extends React.Component {
  render() {
    const setting: Item[] = [
      {
        title: 'hoge',
        time: '00:00:00',
      },
      {
        title: 'fuga',
        time: '00:00:00',
      },
    ]

    return (
      <View style={styles.container}>
        <FlatList
          data={setting}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  keyExtractor(item: Item): string {
    return item.title
  }

  renderItem = ({ item }: { item: Item }) => {
    return (
      <Text>{item.title}</Text>
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