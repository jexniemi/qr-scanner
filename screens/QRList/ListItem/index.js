import React from 'react';
import { Alert, Clipboard, Linking, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default ({ content, date }) => {
  const handlePress = () => {
    Alert.alert(
      'QR-koodin sisältö:',
      `${content}`,
      [
        {text: 'Peruuta', onPress: () => {}, style: 'cancel'},
        {text: 'Avaa', onPress: () => {
          Linking.openURL(content).catch((err) => Alert.alert('Virhe', err));
        }},
        {text: 'Kopioi leikepöydälle', onPress: () => {
          Clipboard.setString(content)
          Alert.alert('Kopioitu.')
        }},
      ]
    )
  }
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => handlePress()}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="qrcode" 	
          size={20} 
          color="gray" 
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">{content}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleString('fi-FI')}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = {
	wrapper: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: 80,
		borderBottomWidth: 1,
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		position: 'absolute'
	},
	detailsContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
  },
  content: {
    fontWeight: '500', 
    textDecorationLine: 'underline',
    maxWidth: 200
  },
  date: {
    fontSize: 10 
  }
}