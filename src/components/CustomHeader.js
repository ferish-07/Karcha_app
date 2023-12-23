import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {assets} from '../Utils/assets/Index';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomHeader({
  navigation,
  screen,
  title,
  isEdit,
  deletePressed,
  isbackArror,
}) {
  const onLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };
  if (screen == 'dashboard') {
    return (
      <LinearGradient
        colors={['#40bcb6', '#248592']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        locations={[0, 0.8]}
        style={{
          flexDirection: 'row',
          // backgroundColor: '#2f999e',
          height: 60,
          justifyContent: 'center',
          elevation: 5,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '70%',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>Ferish</Text>
        </View>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => onLogout()}>
            <Icon name="power-outline" size={25} color={'red'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  } else if (screen == 'normal') {
    return (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: '#2f999e',
          height: 40,
          // justifyContent: 'center',
        }}>
        <View style={{justifyContent: 'center', padding: 8}}>
          {isbackArror ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{justifyContent: 'center', width: '80%'}}>
          <Text style={{fontSize: 18}}>{title}</Text>
        </View>
        {isEdit ? (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => deletePressed()}>
            <Icon name={'trash-outline'} size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
