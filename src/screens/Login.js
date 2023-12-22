import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {assets} from '../Utils/assets/Index';
import ToastComponent from '../components/ToastComponent';
import Toast from 'react-native-toast-message';
import {ToastMsg} from '../Utils/common/common';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const onLoginPressed = () => {
    if (userName == '') {
      console.log('Username is empty');
      setUserNameError(true);
    } else if (password == '') {
      setPasswordError(true);
    } else {
      auth()
        .signInWithEmailAndPassword(userName, password)
        .then(msg => {
          console.log('User account created & signed in!', msg);
          ToastMsg('Login SuccessFull', 'success');
          setTimeout(() => {
            navigation.navigate('setMpin');
          }, 1000);
        })
        .catch(error => {
          console.log(
            'vfghj=================================================',
            error.code,
          );
          if (error.code === 'auth/invalid-login') {
            console.log('Invalid Email or Password!!!!!!!!!!!!!!!');
            ToastMsg('Invalid Email or Password!', 'error');
          }

          console.error(error);
        });
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        AsyncStorage.setItem(
          'GOOGLE_SIGNIN_USERINFO',
          JSON.stringify(userInfo),
        );
        navigation.navigate('setMpin');
      }
      console.log(
        '==================userInfo==========================',
        userInfo,
      );
    } catch (error) {
      console.log(
        '---------------------ERROR--------------------------',
        error,
      );
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View
          // source={assets.background}
          style={{
            // flex: 1,
            justifyContent: 'center',
            // overflow: 'hidden',
            // opacity: 0.9,
          }}>
          <StatusBar translucent backgroundColor="transparent" />
          <ToastComponent />
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
          <View style={{marginHorizontal: 10}}>
            <TextInput
              placeholderTextColor={'grey'}
              style={{
                borderBottomWidth: 0.5,
                // borderRadius: 10,
                padding: 10,

                //   backgroundColor: '#1a2b33',
              }}
              onChangeText={t => setUserName(t)}
              placeholder="Username, email address or mobile number"
            />
            {userNameError ? (
              <>
                <Text style={{color: 'red'}}>*Username is required</Text>
              </>
            ) : null}
            <TextInput
              placeholderTextColor={'grey'}
              onChangeText={p => setPassword(p)}
              style={{
                borderBottomWidth: 0.5,
                // borderRadius: 10,
                marginTop: 10,
                padding: 10,
              }}
              placeholder="Password"
              secureTextEntry={true}
              // passwor
            />
            {passwordError ? (
              <>
                <Text style={{color: 'red'}}>*Password is required</Text>
              </>
            ) : null}
            <TouchableOpacity
              style={{
                backgroundColor: '#0062e1',
                marginTop: 10,
                borderRadius: 60,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onLoginPressed()}>
              <View>
                <Text style={{color: 'black'}}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // flex: 0.2,
            }}>
            <Text>Don't Have Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'blue'}}> Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              // backgroundColor: 'red',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => onGoogleButtonPress()}
              // disabled={this.state.isSigninInProgress}
            />
          </View>
          {/* <TouchableOpacity
          onPress={async () => {
            const confirm = await auth().signInWithPhoneNumber(
              '+91 6353570700',
            );
            console.log('---------CONFIRMMMMMMMMMMMM------', confirm);
          }}>
          <Text>SIGn in with Phone</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
