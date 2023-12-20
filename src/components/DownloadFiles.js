import React from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

let dbUrl =
  'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_XLSX.xlsx';
export const checkPermission = async () => {
  console.log('chek permission');
  if (Platform.OS === 'ios') {
    downloadDb();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (Platform.constants['Release'] >= 13) {
        downloadDb();
      } else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadDb();
      } else {
        // If permission denied then show alert
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
};
const downloadDb = () => {
  let ext = getExtention(dbUrl);
  ext = '.' + ext[0];
  console.log('extension==>', ext);
  const {config, fs} = RNFetchBlob;
  let DownloadDir = fs.dirs.DownloadDir;
  let downloadDirPath = DownloadDir + '/E360' + ext;
  var date = new Date();

  const fPath =
    fs.dirs.DocumentDir +
    '/' +
    Math.floor(date.getTime() + date.getSeconds() / 2) +
    '.xlsx';
  console.log('fpaht', fPath);

  console.log('DownloadDir==>', downloadDirPath);
  let options = {
    fileCache: true,
    path: fPath,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: 'Excel download',
      path: DownloadDir + '/E360/' + 'Survey_data' + ext,
      description: 'Excel',
    },
  };
  config(options)
    .fetch('GET', dbUrl)
    .progress({count: 250}, (received, total) => {
      console.log('=============================>', (received / total) * 100);
    })
    .then(res => {
      console.log('res -> ', JSON.stringify(res));
      // FileViewer.open(res.path())
      //   .then(() => console.log('success'))
      //   .catch(error => console.log('ERROR', error));
      Share.open(res.path())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });

      alert('Database Downloaded Successfully.', res.path());
      //   moveDatabase(res.path());
    });
};

const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

const styles = StyleSheet.create({});
