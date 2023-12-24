import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import Splash from './src/screens/Splash';
import Route from './src/components/Route';
import NotificationService from './src/components/NotificationService';
import BackgroudNotification from './src/components/BackgroudNotification';
import SqlLite from './src/components/SqlLite';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Route />
      <NotificationService />
      <SqlLite />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
