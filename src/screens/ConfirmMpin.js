import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ToastComponent from '../components/ToastComponent';
import {ToastMsg} from '../Utils/common/common';
import {assets} from '../Utils/assets/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ConfirmMpin({route, navigation}) {
  const {screen, setPin} = route.params;
  console.log('PARAMMSSSSSSS', screen, setPin);
  const pinMatri = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['AC', 0, 'c'],
  ];
  const [pinArray, setPinArray] = useState([]);
  const [refreshView, setrefreshView] = useState(0);
  let arr = [];
  const pinView = [1, 2, 3, 4];
  const onPressedPin = async item => {
    if (pinArray.length < 4) {
      if (item == 'c') {
        pinArray.pop();
      } else {
        pinArray.push(item);
      }
    } else {
      if (item == 'c') {
        pinArray.pop();
      }
    }
    if (pinArray.length > 3) {
      console.log(
        '4444444444444444444444444444444444444444444444444444',
        setPin,
        pinArray,
      );
      if (screen == 'ConfirmMpin') {
        if (setPin.join('') == pinArray.join('')) {
          setPinArray([]);
          AsyncStorage.setItem('MPIN', pinArray.join(''));
          navigation.reset({
            index: 0,
            routes: [{name: 'Drawer'}],
          });
        } else {
          ToastMsg("Mpin doesn't Match", 'error');
        }
      } else if (screen == 'LoginWithMpin') {
        let MPIN_FROM_ASYNC = await AsyncStorage.getItem('MPIN');
        console.log('MPIN_FROM_ASYNC', MPIN_FROM_ASYNC);
        if (MPIN_FROM_ASYNC == pinArray.join('')) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Drawer'}],
          });
        } else {
          ToastMsg('Wrong Mpin', 'error');
        }
      }
    }

    console.log('ARAAYYYYyyyyyyyyyyyyYYYYYYYYYYYYYYYYYYYYYYYY', pinArray);
    // setPinArray([...arr]);
    setrefreshView(refreshView + 1);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <View style={{zIndex: 2, margin: 0}}>
        <ToastComponent />
      </View>
      <View
        style={{
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
          // justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
        }}>
        <Text style={{fontSize: 18}}>
          {screen == 'ConfirmMpin' ? 'Confirm Mpin' : 'Login With MPin'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            // flex: 1,
            // backgroundColor: 'grey',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          {pinView.map((i, index) => {
            return (
              <View
                style={{
                  backgroundColor:
                    pinArray.length - 1 >= index ? 'lightblue' : 'white',
                  height: 20,
                  width: 20,
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor:
                    pinArray.length - 1 >= index ? 'lightblue' : 'black',
                }}
              />
            );
          })}
        </View>
        <View style={{marginTop: 50}}>
          {pinMatri.map((items, index) => {
            return (
              <View style={{flexDirection: 'row'}}>
                {items.map(item => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginHorizontal: 30,
                        marginVertical: 10,
                        // padding: 0,
                        borderRadius: 20,
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        elevation: 3,
                        backgroundColor: 'white',
                      }}
                      onPress={() => {
                        onPressedPin(item);
                      }}>
                      <Text style={{fontSize: 20}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
