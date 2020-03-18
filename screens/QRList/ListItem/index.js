import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default (props) => (
	<TouchableOpacity
		style={styles.wrapper}
	>
		<View style={styles.iconContainer}>
			<MaterialCommunityIcons
				name="qrcode" 	
				size={20} 
				color="gray" 
			/>
    </View>
		<View style={styles.detailsContainer}>
			<Text style={styles.url}>{props.url}</Text>
			<Text style={styles.date}>{new Date(props.date).toLocaleString('fi-FI')}</Text>
		</View>
		
	</TouchableOpacity>
)

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
  url: {
    fontWeight: '500', 
    textDecorationLine: 'underline'
  },
  date: {
    fontSize: 10 
  }
}