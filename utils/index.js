import { Alert, Linking } from 'react-native';

export const openUrl = (url) => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('QR-koodia ei voida avata millään sovelluksella: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => Alert.alert('An error occurred ', err))
}