import React, { ReactPropTypes } from 'react'
import { Alert, AsyncStorage, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

export default ({ onButtonPress }) => {
  const clearStorage = () => {
    Alert.alert(
      "Tyhjennä varasto.",
      "Oletko varma, että haluat poistaa kaikkit skannatut koodit?",
      [
        { text: 'Ok', onPress: () => onButtonPress()},
        { text: 'Peruuta', style: 'cancel'}
      ]
    )
  }

  return (
    <TouchableOpacity 
      onPress={() => clearStorage()}
      style={{ width: 105, alignItems: 'center', justifyContent: 'center' }}
    >
      <MaterialIcons
        name="layers-clear" 	
        size={35} 
        color="red" 
      />
    </TouchableOpacity> 
  )
}