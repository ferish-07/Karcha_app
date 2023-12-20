import Toast from 'react-native-toast-message';

export const ToastMsg = (msg, type) => {
  Toast.show({
    type: type,
    text1: msg,
    // And I can pass any custom props I want
    //   props: {uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70'},
  });
};
