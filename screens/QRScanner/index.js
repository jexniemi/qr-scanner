import React, { useState, useEffect } from 'react';
import { Alert, AsyncStorage, Clipboard, Text, View, StyleSheet, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    Alert.alert(
      'QR-koodi luettu.',
      `Sisältö:\n "${data}". Avataanko?`,
      [
        {text: 'Peruuta', onPress: () => setScanned(false), style: 'cancel'},
        {text: 'OK', onPress: () => handleAlertOk(data)},
        {text: 'Kopioi leikepöydälle', onPress: () => {
          Clipboard.setString(data)
          Alert.alert('Kopioitu.')
        }},
      ]
    )
  };
  
  const handleAlertOk = async (data) => {
    await _storeData(data), 
    setScanned(false)
    Linking.openURL(data).catch((err) => Alert.alert('Virhe', err));
  }

	const _storeData = async (data) => {
		var newItem = { date: `${new Date()}`, data }
		try {
			var scannedCodes = await AsyncStorage.getItem('ScannedCodes');
			if (scannedCodes == null) {
				scannedCodes = []
			} else {
				scannedCodes = JSON.parse(scannedCodes)
			}
			scannedCodes.push(newItem)
			await AsyncStorage.setItem('ScannedCodes', JSON.stringify(scannedCodes));
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
    </View>
  );
}