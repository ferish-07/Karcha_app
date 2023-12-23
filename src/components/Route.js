import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SetMpin from '../screens/SetMpin';
import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';
import ConfirmMpin from '../screens/ConfirmMpin';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ValueEntry from './ValueEntry';
import AddCategory from '../screens/AddCategory';
import CustomSidebarMenu from './CustomSidebarMenu';

export default function Route() {
  const Stack = createNativeStackNavigator();

  const Drawer = createDrawerNavigator();

  const DrawerNavigation = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Category" component={AddCategory} />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="setMpin" component={SetMpin} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConfirmMpin" component={ConfirmMpin} />
        <Stack.Screen name="valueEntry" component={ValueEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
