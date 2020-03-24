import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default ({ navigation }) => (
  <TouchableOpacity 
    onPress={() => navigation.navigate('QR Skanneri')}
    style={{ width: 105, alignItems: 'center', justifyContent: 'center' }}
  >
    <Ionicons
      name="md-qr-scanner" 	
      size={35} 
      color="black" 
    />
  </TouchableOpacity> 
)