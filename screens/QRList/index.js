import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, FlatList } from 'react-native';
import ListItem from './ListItem'

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
