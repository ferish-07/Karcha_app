import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export default function ToastComponent() {
  const toastConfig = {
    /*
          Overwrite 'success' type,
          by modifying the existing `BaseToast` component
        */
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    /*
          Overwrite 'error' type,
          by modifying the existing `ErrorToast` component
        */
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
          Or create a completely new type - `tomatoToast`,
          building the layout from scratch.
      
          I can consume any custom `props` I want.
          They will be passed when calling the `show` method (see below)
        */
  };

  return (
    <>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({});
