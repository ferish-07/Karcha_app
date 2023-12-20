import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {assets} from '../Utils/assets/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}) {
  const getMPinStatus = async () => {
    let pinn = await AsyncStorage.getItem('MPIN');
    console.log('pinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', pinn);
    if (pinn == null) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'ConfirmMpin', params: {screen: 'LoginWithMpin'}}],
        });
      }, 1000);
    }
    // return await AsyncStorage.getItem('MPIN');
  };
  useEffect(() => {
    getMPinStatus();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={assets.instagram_logo}
          style={{width: 140, height: 140}}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          // backgroundColor: 'red',
          // flex: 0.25,
        }}>
        <Text style={{color: 'grey'}}>From</Text>
        <View style={{}}>
          <Image source={assets.meta_logo} resizeMode="center" style={{}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
