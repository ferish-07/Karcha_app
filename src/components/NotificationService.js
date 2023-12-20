import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';

export default function NotificationService() {
  async function requestUserPermission() {
    console.log('permission');
    await notifee.requestPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled;
  }

  async function onAppBootstrap() {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    console.log('Old Device Token:', checkToken);

    if (!checkToken) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('New Device Token:', token);
      await AsyncStorage.setItem('fcmToken', token);
    }
  }

  async function onDisplayNotification(message) {
    console.log('NOTIFICATION MESSAGE', message);
    // if (message.data.data) {
    //   console.log("DATA  :  ", JSON.parse(message.data.data)[0])
    // } else {
    //   console.log("DATA  :  ", "No data payload ")
    // }

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'bamboo',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      // id: message?.data?.notificationId,
      title: message?.data?.title,
      body: message?.data?.body,
      data: message.data.data ? message.data.data : {},
      android: {
        sound: 'bamboo',
        // smallIcon: 'ic_notification',
        ongoing: message?.data?.dismiss == 'true',
        channelId,
        importance: AndroidImportance.HIGH,
        //largeIcon: message?.data?.image,
        pressAction: {
          id: 'default',
        },
        actions:
          message?.data?.dismiss == 'true'
            ? [
                {
                  title: 'Dismiss',
                  pressAction: {id: 'dismiss'},
                },
              ]
            : // message?.data?.id == 'LEAVE_APROVAL' ? [
              //   {
              //     title: 'Approve',
              //     pressAction: {
              //       id: 'approve',
              //     },
              //     // input: true, // enable free text input
              //   },
              //   {
              //     title: 'Reject',
              //     pressAction: {
              //       id: 'reject',
              //     },
              //     input: {
              //       //allowFreeFormInput: true, // set to false
              //       // choices: ['Yes', 'No', 'Maybe'],
              //       placeholder: 'Reason...',
              //       editableChoices: false,

              //     },
              //   },
              // ] :
              [],
      },
    });
  }

  // async function onDisplayLeaveUpdate(id, msg) {

  //   const channelId = await notifee.createChannel({
  //     id: id,
  //     name: 'Default Channel',
  //     sound: 'default',
  //     importance: AndroidImportance.HIGH,
  //   });

  //   await notifee.displayNotification({
  //     id: id,
  //     title: 'Leave',
  //     body: msg,
  //     android: {
  //       channelId,
  //       actions: [
  //         {
  //           title: "OKay",
  //           pressAction: { id: 'okay' },
  //         }
  //       ]
  //     },

  //   });
  // }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await AsyncStorage.setItem('OpenScreen', remoteMessage.data.id);
      console.log('foreground......', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission().then(() => {
      onAppBootstrap();
    });
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      let openScreen = await AsyncStorage.getItem('OpenScreen');
      console.log(
        '......................................................',
        type,
        EventType.PRESS,
        detail,
      );
      if (type === EventType.PRESS) {
        let isLogin = await AsyncStorage.getItem('isLogin');

        console.log(
          'Foreground User pressed notification ===================>',
          detail.notification,
        );

        if (isLogin == 'yes') {
        }
        // else {
        //   console.log("user not Login.......")
        //   await AsyncStorage.setItem('isMsgBeforeUserLogin', 'yes');
        // }
      }

      if (type === EventType.ACTION_PRESS && pressAction.id === 'dismiss') {
        console.log('dismiss');
        await notifee.cancelNotification(notification.id);
      }
    });
  }, []);
}
