import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import QRListScreen from './screens/QRList';
import QRScanner from './screens/QRScanner';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
			<Stack.Navigator 
        initialRouteName="QRScanner"
        mode="modal"
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
            headerTransparent: true,
						headerTitleStyle: {
							color: 'white',
						},
					}}
				/>
				<Stack.Screen 
					name="Skannatut QR-koodit" 
					component={QRListScreen} 
					options={({ navigation }) => ({
						headerLeft: () => ( 
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
					})}
				/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
