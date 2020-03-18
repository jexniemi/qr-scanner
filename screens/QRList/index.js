import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default (props) => {
	const [ scannedCodes, setScannedCodes ] = useState([])

	useEffect(() => {
		_retrieveData()
	}, [])

	const _retrieveData = async () => {
		try {
			var codes = await AsyncStorage.getItem('ScannedCodes')
			if (codes != null) {
				setScannedCodes(JSON.parse(codes).reverse())
			}
		} catch (error) {
			alert(error)
		}
	};

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
			<FlatList 
				data={scannedCodes}
        renderItem={({ item }) => <ListItem url={item.data} date={item.date} />}
        keyExtractor={item => item.date}
			/>
    </View>
  )
}

const ListItem = (props) => (
	<TouchableOpacity
		style={listItemStyle.wrapper}
	>
		<View style={listItemStyle.iconContainer}>
			<MaterialCommunityIcons
				name="qrcode" 	
				size={20} 
				color="gray" 
			/>
    </View>
		<View style={listItemStyle.detailsContainer}>
			<Text style={listItemStyle.url}>{props.url}</Text>
			<Text style={listItemStyle.date}>{new Date(props.date).toLocaleString('fi-FI')}</Text>
		</View>
		
	</TouchableOpacity>
)

const listItemStyle = {
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