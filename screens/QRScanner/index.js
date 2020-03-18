import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View, FlatList, ScrollView, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from '@expo/vector-icons';

export default (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
		_storeData(data)
	};

	const _storeData = async (data) => {
		var newItem = { date: `${new Date()}`, data }
		try {
			var scannedCodes = await AsyncStorage.getItem('ScannedCodes');
			if (scannedCodes == null) {
				scannedCodes = []
			} else {
				scannedCodes = JSON.parse(scannedCodes)
			}
			console.log(scannedCodes)
			scannedCodes.push(newItem)
			await AsyncStorage.setItem('ScannedCodes', JSON.stringify(scannedCodes));
			alert('success saving')
		} catch (error) {
			alert(error)
		}
	};

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
			<TouchableOpacity
				style={{ position: 'absolute', zIndex: 100000, right: 20, top: 20 }} 
				onPress={() => props.navigation.navigate('Skannatut QR-koodit')}
			>
				<FontAwesome
					name="list" 	
					size={40} 
					color="white" 
				/>
			</TouchableOpacity>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
		
  );
}