import React, { Component } from 'react'
import {
  Animated,
  AppRegistry,
  Dimensions,
  ListView,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native'

class Row extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animatedX: new Animated.Value(0),
    }

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        console.log('MOVE SET', 'x', Math.abs(gestureState.dx), 'y', Math.abs(gestureState.dy))

        const dx = Math.abs(gestureState.dx)
        const dy = Math.abs(gestureState.dy)

        return dx > 0.7 && dx > dy
      },
      onPanResponderGrant: (event, gestureState) => {
        console.log('GRANT', gestureState.dx)

        //props.lv.setNativeProps({ scrollEnabled: false })
      },
      onPanResponderMove: (event, gestureState) => {
        console.log('MOVE')

        this.state.animatedX.setValue(gestureState.moveX)
      },
      onPanResponderRelease: () => {
        console.log('RELEASE')

        //props.lv.setNativeProps({ scrollEnabled: true })
      },
      //onPanResponderTerminate: () => console.log('TERMINATE'),
      onShouldBlockNativeResponder: () => false,
    })
  }

  setAnimatedValue(value) {
    this.state.animatedX.setValue(value)
  }

  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={{
          ...this.props.style,
          transform: [{ translateX: this.state.animatedX}]
        }}
      >
        <Text>{this.props.data}</Text>
      </Animated.View>
    )
  }
}

export default class rows extends Component {
  constructor() {
    super()

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      dataSource: ds.cloneWithRows(new Array(42).fill(1)),
      scrollEnabled: true,
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ListView
          ref={(lv) => { this.lv = lv}}
          dataSource={this.state.dataSource}
          renderRow={
            data => (
              <Row
                style={{...styles.row}}
                data={data}
                lv={this.lv}
              />
            )
          }
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  row: {
    height: 70,
    alignItems: 'center',
    backgroundColor: 'white',
  },
}

AppRegistry.registerComponent('rows', () => rows)
