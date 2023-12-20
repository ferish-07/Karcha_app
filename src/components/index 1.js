/**
 * @format
 */
import { AppRegistry, Platform, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType, AndroidImportance, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../hcis_app/src/route/Route';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("background msg:--------------------", remoteMessage)
    await AsyncStorage.setItem('OpenScreen', remoteMessage.data.id);
    if (Platform.OS == "android") {
        onDisplayNotification(remoteMessage);
    }
});

async function onDisplayNotification(message) {

    // if (message.data.data) {
    //     console.log("DATA  :  ", JSON.parse(message.data.data)[0])
    // } else {
    //     console.log("DATA  :  ", "No data payload ")
    // }

    const channelId = await notifee.createChannel({
        id: message?.data?.notificationId,
        name: 'Default Channel',
        sound: 'default',
        importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
        id: message?.data?.notificationId,
        title: message?.data?.title,
        body: message?.data?.body,
        // data: message.data.data ? JSON.parse(message.data.data)[0] : {},
        android: {
            sound: 'default',
            smallIcon: 'ic_notification',
            ongoing: message?.data?.dismiss == 'true',
            channelId,
            style: { type: AndroidStyle.BIGTEXT, text: message?.data?.body },
            importance: AndroidImportance.HIGH,
            //largeIcon: message?.data?.image,
            pressAction: {
                id: 'default',
            },
            actions: message?.data?.dismiss == 'true' ? [
                {
                    title: "Dismiss",
                    pressAction: { id: 'dismiss' },
                }
            ] :
                //  message?.data?.id == 'LEAVE_APROVAL' ? [
                //     {
                //         title: 'Approve',
                //         pressAction: {
                //             id: 'approve',
                //         },
                //         // input: true, // enable free text input
                //     },
                //     {
                //         title: 'Reject',
                //         pressAction: {
                //             id: 'reject',
                //         },
                //         input: {
                //             //allowFreeFormInput: true, // set to false
                //             // choices: ['Yes', 'No', 'Maybe'],
                //             placeholder: 'Reason...',
                //             editableChoices: false,

                //         },
                //     },

                // ] : 
                [],

        },
    });
}

// async function onDisplayLeaveUpdate(id, msg) {

//     const channelId = await notifee.createChannel({
//         id: id,
//         name: 'Default Channel',
//         sound: 'default',
//         importance: AndroidImportance.HIGH,
//     });

//     await notifee.displayNotification({
//         id: id,
//         title: 'Leave',
//         body: msg,
//         android: {
//             channelId,
//             actions: [
//                 {
//                     title: "OKay",
//                     pressAction: { id: 'okay' },
//                 }
//             ]
//         },

//     });
// }

notifee.onBackgroundEvent(async ({ type, detail }) => {

    const { notification, pressAction } = detail;

    console.log("Index =============>", detail)

    if (type === EventType.ACTION_PRESS && pressAction.id === 'dismiss') {
        console.log("dismiss")
        await notifee.cancelNotification(notification.id);
    }

    if (type === EventType.PRESS) {

        let isLogin = await AsyncStorage.getItem('isLogin');
        let openScreen = await AsyncStorage.getItem('OpenScreen');

        console.log("Index isLogin=============>", isLogin)
        console.log("Index openScreen=============>", openScreen)
        console.log('Index User pressed notification', detail.notification);

        if (isLogin == 'yes') {
            if (openScreen == "survey") {
                navigationRef.current?.navigate('Survey');
            } else if (openScreen == "broadcast") {
                navigationRef.current?.navigate('Communication');
            } else if (openScreen == "LEAVE_APROVAL" || openScreen == "LEAVE_APPLY" || openScreen == "LEAVE_APROVAL_LEVEL1" || openScreen == "LEAVE_APPLY_LEVEL1") {
                navigationRef.current?.navigate('leave');
            }
        }
    }


    // if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reject') {
    //     callApi(2, detail.input)
    // }

    // if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'approve') {
    //     callApi(3, null)
    // }

    // async function callApi(statusId, remark) {

    //     let token = await AsyncStorage.getItem('LOGINTOKEN');
    //     let userCode = await AsyncStorage.getItem('userCode');

    //     let leaveApply = [
    //         {
    //             employee_leave_id: notification?.data?.employee_leave_id, //item.employee_leave_id,
    //             employee_id: notification?.data?.employee_id,// item.employee_id,
    //             leave_status_id: statusId,// statusId,
    //             leave_reason_id: notification?.data?.leave_reason_id,//item.leave_reason_id,
    //             leave_from: notification?.data?.leave_from, //moment(item.leave_from, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm',),
    //             leave_to: notification?.data?.leave_to,
    //             leave_remark: notification?.data?.leave_remark,//item.leave_remark,
    //             approval_remark: remark,//remark,
    //             leave_day_type_id: notification?.data?.leave_day_type_id,//item.leave_day_type_id,
    //         },
    //     ];

    //     let payload = {
    //         leaveApply,
    //         is_approval: true,
    //     };

    //     console.log(payload)

    //     fetch(`http://49.249.5.98:8888/hcisms/attendance/leave/apply/upsert/${userCode}/v1`, {
    //         method: 'POST',
    //         body: JSON.stringify(payload),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //             'token': token
    //         },
    //     }).then((response) => response.json()).
    //         then(async (json) => {
    //             if (json.error == false) {
    //                 if (json.code == 'HCIS_MS_UPSERT_LEAVE_APPLY_200') {

    //                     if (statusId == 2) {
    //                         console.log("rejected")
    //                         onDisplayLeaveUpdate(notification.id, "Leave rejected successfully...")
    //                     } else {
    //                         console.log("Approved")
    //                         onDisplayLeaveUpdate(notification.id, "Leave Approved successfully...")
    //                     }

    //                 } else {
    //                     console.log('Data not found');
    //                     console.log("Error")
    //                     onDisplayLeaveUpdate(notification.id, "Error")
    //                 }
    //             } else if (json.error == true) {
    //                 console.log("Error")
    //                 onDisplayLeaveUpdate(notification.id, "Error")
    //             }
    //         });

    // }

});

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;


AppRegistry.registerComponent(appName, () => App);
