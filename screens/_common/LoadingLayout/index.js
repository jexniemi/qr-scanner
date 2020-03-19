import React from 'react'
import { ActivityIndicator, View } from 'react-native'
 
export default (props) => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='black'/>
  </View>
)

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
}