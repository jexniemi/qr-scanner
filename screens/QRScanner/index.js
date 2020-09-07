import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  Clipboard,
  Dimensions,
  Text,
  View,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "QR-koodi luettu.",
      `Sisältö:\n "${data}"`,
      [
        { text: "Peruuta", onPress: () => setScannedFalse(), style: "cancel" },
        { text: "Avaa", onPress: () => handleAlertOpen(data) },
        { text: "Kopioi leikepöydälle", onPress: () => handleAlertCopy(data) },
      ],
      { cancelable: false }
    );
  };

  const setScannedFalse = () => {
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  const handleAlertCopy = async (data) => {
    await _storeData(data);
    Clipboard.setString(data);
    Alert.alert(
      "Kopioitu.",
      "",
      [{ text: "Ok", onPress: () => setScannedFalse() }],
      { cancelable: false }
    );
  };

  const handleAlertOpen = async (data) => {
    await _storeData(data), setScannedFalse();
    const supported = await Linking.canOpenURL(data);
    if (supported) {
      await Linking.openURL(data);
    } else {
      Alert.alert("Ei avattavissa. Koodi tallennettu.");
    }
  };

  const _storeData = async (data) => {
    var newItem = { date: `${new Date()}`, data };
    try {
      var scannedCodes = await AsyncStorage.getItem("ScannedCodes");
      if (scannedCodes == null) {
        scannedCodes = [];
      } else {
        scannedCodes = JSON.parse(scannedCodes);
      }
      scannedCodes.push(newItem);
      await AsyncStorage.setItem("ScannedCodes", JSON.stringify(scannedCodes));
    } catch (error) {
      alert(error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={
          scanned || !isFocused ? undefined : handleBarCodeScanned
        }
        style={styles.barCodeScanner}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  barCodeScanner: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
};
