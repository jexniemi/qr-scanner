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
    <View>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => handlePress()}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="qrcode" 	
            size={22} 
            color="gray" 
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">{content}</Text>
          <Text style={styles.date}>{new Date(date).toLocaleString('fi-FI')}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray'}}/>
    </View>
  )
}

const styles = {
	wrapper: {
		flexDirection: 'column',
		justifyContent: 'center',
    height: 100,
    backgroundColor: 'white'
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 85,
		position: 'absolute'
	},
	detailsContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    textAlign: 'center',
    fontWeight: '500', 
    fontSize: 13,
    textDecorationLine: 'underline',
    maxWidth: 220
  },
  date: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(80,80,80,1)',
    paddingTop: 5
  }
}