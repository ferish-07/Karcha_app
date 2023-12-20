/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import BackgroudNotification from './src/components/BackgroudNotification';

notifee.onBackgroundEvent(async ({type, detail}) => {
  // const { notification, pressAction } = detail;
  console.log(
    'BACKGROUND NOTIFICAITON =============>',
    detail,
    '------',
    type,
    EventType.PRESS,
  );

  if (type === EventType.PRESS) {
    console.log('Index isLogin=============>', isLogin);
    console.log('Index openScreen=============>', openScreen);
    console.log('BACKGOUND User pressed notification', detail.notification);
  }

  if (type === EventType.ACTION_PRESS && pressAction.id === 'dismiss') {
    console.log('dismiss');
    await notifee.cancelNotification(notification.id);
  }
});
async function onDisplayNotification(message) {
  // if (message.data.data) {
  //     console.log("DATA  :  ", JSON.parse(message.data.data)[0])
  // } else {
  //     console.log("DATA  :  ", "No data payload ")
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
        launchActivity: 'default',
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

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('background msg:--------------------', remoteMessage);

  if (Platform.OS == 'android') {
    onDisplayNotification(remoteMessage);
  }
});

AppRegistry.registerComponent(appName, () => App);
