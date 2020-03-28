import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AsyncStorage, View, FlatList, Alert, Text } from 'react-native';
import ListItem from './ListItem'
import LoadingLayout from '../_common/LoadingLayout'
import ClearStorageButton from './ClearStorageButton'
import ToQRScannerButton from './ToQRScannerButton';

export default ({ navigation }) => {
  const [ scannedCodes, setScannedCodes ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  var noScannedCodes = scannedCodes.length === 0

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ClearStorageButton onButtonPress={onClearButtonPress} disabled={noScannedCodes} />,
      headerLeft: () => <ToQRScannerButton navigation={navigation}/>
    })
  }, [ navigation ])

	useEffect(() => {
    _retrieveData()
  }, [])

  const onClearButtonPress = async () => {
    AsyncStorage.removeItem('ScannedCodes', setScannedCodes([]), e => Alert.alert(e))
  }

	const _retrieveData = async () => {
    // setScannedCodes(JSON.parse(mockData))
		try {
			var codes = await AsyncStorage.getItem('ScannedCodes')
			if (codes != null) {
				setScannedCodes(JSON.parse(codes).reverse())
			}
		} catch (error) {
      Alert.alert(error)
    }
    setIsLoading(false)
  };
  
  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(240,240,240,1)' }}>
      { noScannedCodes ? 
        <NoScannedCodesMessage />
        :
        <FlatList 
          data={scannedCodes}
          renderItem={({ item }) => <ListItem content={item.data} date={item.date} />}
          keyExtractor={item => item.date}
          contentContainerStyle={{ marginTop: 8 }}
			  />
      }
    </View>
  )
}

const NoScannedCodesMessage = () => (
  <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text style={{ alignSelf: 'center'}}>Ei skannattuja koodeja.</Text>
  </View>
)
