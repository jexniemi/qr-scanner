import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import QRListScreen from './screens/QRList';
import QRScanner from './screens/QRScanner';

const Stack = createStackNavigator();

export default function App() {
	const [ scannedCodes, setScannedCodes ] = useState([])
	
  return (
    <NavigationContainer>
			<Stack.Navigator 
				initialRouteName="QRScanner"
				screenOptions={{
					headerStyle: {
						backgroundColor: 'white',
					},
					headerTitleStyle: {
            color: 'black',
          },
				}}
			>
				<Stack.Screen 
					name="QR Skanneri" 
					component={QRScanner} 
					options={{
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTitleStyle: {
							color: 'white',
						},
					}}
				/>
				<Stack.Screen 
					name="Skannatut QR-koodit" 
					component={QRListScreen} 
					options={ ({ navigation }) => ({
						headerLeft: () => ( 
						<TouchableOpacity 
							onPress={() => navigation.goBack()}
							style={{ paddingLeft: 5}}
						>
							<Ionicons
								name="md-qr-scanner" 	
								size={40} 
								color="black" 
							/>
					</TouchableOpacity> )
					})}
				/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
