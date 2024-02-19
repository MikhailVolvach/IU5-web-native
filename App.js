import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './store';
import { Provider } from 'react-redux';

import DataList from './screens/DataList';
import DataItem from './screens/DataItem';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Услуги' component={DataList}/>
          <Stack.Screen name='Услуга' component={DataItem}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
