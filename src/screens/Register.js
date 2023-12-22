import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {assets} from '../Utils/assets/Index';
import auth from '@react-native-firebase/auth';
import ToastComponent from '../components/ToastComponent';
import {ToastMsg} from '../Utils/common/common';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [UserName, setUserName] = useState('');
  const onRegister = () => {
    console.log('reg');
    if (password != confirmPassword) {
      ToastMsg('Password Does not match', 'error');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          console.log(
            'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
            userCredentials,
          );
          if (
            userCredentials.user.updateProfile({
              displayName: UserName,
              // photoURL:
            })
          )
            console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            ToastMsg('That email address is already in use!', 'error');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            ToastMsg('That email address is invalid!', 'error');
          }

          console.error(error);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ToastComponent />

        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              height: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={assets.instagram_logo}
              style={{width: 140, height: 140}}
            />
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <TextInput
            onChangeText={p => setUserName(p)}
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
            }}
            placeholder="User Name"
            placeholderTextColor={'grey'}
          />
          <TextInput
            onChangeText={p => setEmail(p)}
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
            }}
            placeholder="Email"
            placeholderTextColor={'grey'}
          />
          <TextInput
            onChangeText={p => setPassword(p)}
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
            }}
            placeholder="Password"
            placeholderTextColor={'grey'}
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={p => setConfirmPassword(p)}
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              marginTop: 10,
              padding: 10,
            }}
            placeholder="Confirm Password"
            placeholderTextColor={'grey'}
          />
        </View>
        <View
          style={{
            flex: 1,
            //   backgroundColor: 'red',
            justifyContent: 'center',
            marginHorizontal: 20,
            //   alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0062e1',
              marginTop: 10,
              borderRadius: 60,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onRegister()}>
            <View>
              <Text style={{color: 'black'}}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
