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
            size={24} 
            color="rgba(80,80,80,1)" 
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">{content}</Text>
          <Text style={styles.date}>{new Date(date).toLocaleString('fi-FI')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
	wrapper: {
		flexDirection: 'column',
		justifyContent: 'center',
    height: 90,
    marginLeft: 10,
    marginRight: 15,
    marginTop: 6,
    marginBottom: 6,
    borderLeftWidth: 5,
    backgroundColor: 'white'
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 75,
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
    maxWidth: 220
  },
  date: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(80,80,80,1)',
    paddingTop: 5
  }
}