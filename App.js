import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import QRListScreen from './screens/QRList';
import QRScanner from './screens/QRScanner';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
			<Stack.Navigator 
        initialRouteName="QRScanner"
        mode="modal"
			>
				<Stack.Screen 
          name="QR Skanneri" 
					component={QRScanner} 
					options={({ navigation }) => ({
            headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
            },
            headerRight: () => <ToQRList navigation={navigation}/>
					})}
				/>
				<Stack.Screen 
					name="Skannatut QR-koodit" 
					component={QRListScreen} 
					options={({ navigation }) => ({
						headerLeft: () => <ToQRScanner navigation={navigation}/>
					})}
				/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ToQRScanner = ({ navigation }) => (
  <TouchableOpacity 
    onPress={() => navigation.goBack()}
    style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}
  >
    <Ionicons
      name="md-qr-scanner" 	
      size={40} 
      color="black" 
    />
  </TouchableOpacity> 
)

const ToQRList = ({ navigation }) => (
  <TouchableOpacity
    style={{ position: 'absolute', zIndex: 100000, right: 20 }} 
    onPress={() => navigation.navigate('Skannatut QR-koodit')}
  >
    <FontAwesome
      name="list" 	
      size={35} 
      color="white" 
    />
  </TouchableOpacity>
)