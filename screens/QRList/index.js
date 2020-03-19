import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, FlatList } from 'react-native';
import ListItem from './ListItem'
import LoadingLayout from '../_common/LoadingLayout'

export default () => {
  const [ scannedCodes, setScannedCodes ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

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
    setIsLoading(false)
  };
  
  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
			<FlatList 
				data={scannedCodes}
        renderItem={({ item }) => <ListItem content={item.data} date={item.date} />}
        keyExtractor={item => item.date}
			/>
    </View>
  )
}
