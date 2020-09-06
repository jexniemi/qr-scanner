import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Tooltip, Text } from 'react-native-elements';

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
              backgroundColor: 'black',
              height: 80
            },
						headerTitleStyle: {
							color: 'white',
            },
            headerRight: () => <ToQRList navigation={navigation}/>,
            headerLeft: () => <Info/>
					})}
				/>
				<Stack.Screen 
					name="Skannatut QR-koodit" 
					component={QRListScreen} 
				/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ToQRList = ({ navigation }) => (
  <TouchableOpacity
    style={{ width: 105, alignItems: 'center', justifyContent: 'center'}} 
    onPress={() => navigation.navigate('Skannatut QR-koodit')}
  >
    <FontAwesome
      name="list" 	
      size={35} 
      color="white" 
    />
  </TouchableOpacity>
)

const Info = () => (
    <TouchableOpacity
      style={{ width: 105, alignItems: 'center', justifyContent: 'center' }} 
    >
      <Tooltip 
        height={80}
        width={200}
        backgroundColor='white'
        overlayColor='rgba(200,200,200,0.3)'
        popover={
          <Text numberOfLines={2}>
            Osoita QR-koodia kamerallasi lukeaksesi sen.
          </Text>
        }>
      <MaterialIcons
        name="info-outline" 	
        size={35} 
        color="white" 
      />
      </Tooltip>
    </TouchableOpacity>
)