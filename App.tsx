import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomePage from './screens/HomePage';
import CameraScanner from './screens/CameraScanner';
import GalleryScanner from './screens/GalleryScanner';
import theme from './theme.ts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Home' }} />
          <Stack.Screen name="CameraScanner" component={CameraScanner} options={{ title: 'Camera Scanner' }} />
          <Stack.Screen name="GalleryScanner" component={GalleryScanner} options={{ title: 'Gallery Scanner' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
