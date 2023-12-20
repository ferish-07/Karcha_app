import {StyleSheet, Text, View} from 'react-native';
import React, {useDebugValue, useEffect} from 'react';

import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';

export default function BackgroudNotification() {
  useEffect(() => {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      // const { notification, pressAction } = detail;
      console.log(
        'BACKGROUND NOTIFICAITON =============>ssssss',
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
  }, []);
}

const styles = StyleSheet.create({});
