import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
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
        screenOptions={{
          headerStyle: {
            height: 80
          },
          headerTitleAlign: 'center',
        }}
			>
				<Stack.Screen 
          name="QR Skanneri" 
					component={QRScanner} 
					options={({ navigation }) => ({
            headerTransparent: Platform.OS === 'ios' ? true : false,
            headerStyle: {
              backgroundColor: 'black'
            },
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
    onPress={() => navigation.navigate('QR Skanneri')}
    style={{ width: 90, alignItems: 'center', justifyContent: 'center' }}
  >
    <Ionicons
      name="md-qr-scanner" 	
      size={35} 
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