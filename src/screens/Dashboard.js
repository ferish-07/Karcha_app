import {ActivityIndicator, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import ListView from '../components/ListView';
import Overview from '../components/Overview';
import {openDatabase} from 'react-native-sqlite-storage';
import moment from 'moment';
 
export default function Dashboard({navigation}) {
let db = openDatabase({name: 'AppData.db'});
const [isLoading, setIsLoading] = useState(true);

const [update, setupdate] = useState(0)
const [expData, setExpData] = useState([])
const calculation = item => {
  // console.log('-------------CALCULATIOn', item);
  setCashIn(item.cashIn);
  setCashOut(item.cashOut);
};
// const [isLoading,setIsLoading]= useState(false)
useEffect(() => {
  const sub = navigation.addListener("focus",()=>{
setIsLoading(true)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Expense', [], (tx, results) => {
        // console.log('rows00000------  FOCUSSSSS-----------', results.rows.item(0));
        var tempFrom = [];
        var tempTo = [];
        for (let i = 0; i < results.rows.length; ++i) {
          // if (results.rows.item(i).type == 'from') {
          //   tempFrom.push(results.rows.item(i));
          // } else if (results.rows.item(i).type == 'to') {
          //   tempTo.push(results.rows.item(i));
          // }
          tempTo.push(results.rows.item(i))
          console.log(results.rows.item(i));
        }
        const newData = tempTo.reduce((acc, item) => {
                  const existingDate = acc.find(entry => moment(entry.date).format("YYYY-MM-DD") === moment(item.dateTime).format("YYYY-MM-DD"));
                  if (existingDate) {
                    existingDate.children.push(item);
                  } else {
                    acc.push({date: item.dateTime, children: [item]});
                  }
                  return acc;
                }, []);
                newData.sort((a, b) => {
                  var dateA = new Date(a.date);
                  var dateB = new Date(b.date);
                  // console.log("-------DATEEEE A-------", dateA, a.date);
                  return dateB - dateA;
                });
                let negAmt = 0;
                let posAmt = 0;
                newData.map(i => {
                  i.children.map(i2 => {
                    if (i2.cashIn) {
                      posAmt = posAmt + i2.amount;
                    } else {
                      negAmt = negAmt + i2.amount;
                    }
                  });
                });
                setExpData(newData);
                calculation({cashIn: posAmt, cashOut: negAmt});
                setIsLoading(false)
        console.log("---------------TEMP DATAAA", tempTo)
        // setAddressesFrom(tempFrom);
        // setAddressesTo(tempTo);
      });
    });
  })
  return()=>{
    sub
  }
},[navigation]);

useEffect(()=>{
setIsLoading(true)
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Expense', [], (tx, results) => {
      // console.log('rows00000-----------------', results.rows.item(0));
      var tempFrom = [];
      var tempTo = [];
      for (let i = 0; i < results.rows.length; ++i) {
        // if (results.rows.item(i).type == 'from') {
        //   tempFrom.push(results.rows.item(i));
        // } else if (results.rows.item(i).type == 'to') {
        //   tempTo.push(results.rows.item(i));
        // }
        tempTo.push(results.rows.item(i))
        console.log(results.rows.item(i));
      }
      const newData = tempTo.reduce((acc, item) => {
                const existingDate = acc.find(entry => moment(entry.date).format("YYYY-MM-DD") === moment(item.dateTime).format("YYYY-MM-DD"));
                if (existingDate) {
                  existingDate.children.push(item);
                } else {
                  acc.push({date: item.dateTime, children: [item]});
                }
                return acc;
              }, []);
              // console.log("----------NEW DATE-----------", newData)
              newData.sort((a, b) => {
                var dateA = new Date(a.date);
                var dateB = new Date(b.date);
                // console.log("-------DATEEEE A-------", dateA, a.date);
                return dateB - dateA;
              });
              let negAmt = 0;
              let posAmt = 0;
              newData.map(i => {
                i.children.map(i2 => {
                  if (i2.cashIn) {
                    posAmt = posAmt + i2.amount;
                  } else {
                    negAmt = negAmt + i2.amount;
                  }
                });
              });
              setExpData(newData);
              calculation({cashIn: posAmt, cashOut: negAmt});
              setIsLoading(false)
      console.log("---------------TEMP DATAAA", tempTo)
      // setAddressesFrom(tempFrom);
      // setAddressesTo(tempTo);
    });
  })
},[])
  const [userData, setUserData] = useState(null);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);

  const [currentTab, setCurrentTab] = useState('List');

  // const getData = async () => {
  //   let userDatas = await AsyncStorage.getItem('GOOGLE_SIGNIN_USERINFO');
  //   let data = JSON.parse(userDatas);
  //   if (data) {
  //     setUserData(data);
  //     setIsLoading(false);
  //   }
  //   console.log('-------userData------------', userData);
  // };
  
  return (
    <View style={{flex: 1}}>
      {Platform.OS == "ios"?
    <LinearGradient
    colors={['#40bcb6', '#248592']}
    start={{x: 0, y: 0.5}}
    end={{x: 1, y: 0.5}}
    locations={[0, 0.8]}
    style={{height:48}}/>:null  
    }
      <CustomHeader navigation={navigation} screen={"dashboard"} title={"Ferish"}/>
      {/* {!isLoading && userData ? (
        <Image
          source={{uri: userData.user.photo}}
          style={{height: 150, width: 150, borderRadius: 100}}
          resizeMode="center"
        />
      ) : null} */}
      <LinearGradient
        colors={['#40bcb6', '#248592']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        locations={[0, 0.8]}
        style={styles.linearGradient}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 18}}>{cashIn}</Text>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={{}}>Cash In</Text>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{'-'}</Text>
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 18}}>{cashOut}</Text>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={{}}>Cash Out</Text>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{'='}</Text>
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 18}}>{cashIn - cashOut}</Text>
            </View>
            <View style={{marginTop: 8}}>
              <Text style={{}}>Balance</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: '40%',
              padding: 8,
              borderRadius: 50,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: currentTab == 'List' ? 'white' : null,
            }}
            onPress={() => setCurrentTab('List')}>
            <Text
              style={{
                color: currentTab == 'List' ? '#0d8379' : 'white',
                fontSize: 16,
              }}>
              List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              width: '40%',
              padding: 8,
              borderRadius: 50,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: currentTab == 'Overview' ? 'white' : null,
            }}
            onPress={() => setCurrentTab('Overview')}>
            <Text
              style={{
                color: currentTab == 'Overview' ? '#0d8379' : 'white',
                fontSize: 16,
              }}>
              Overview
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* <TouchableOpacity
        onPress={async () => {
          // UPDATE PARTICULAR ENYTRYYYYY
          // await firestore()
          //   .collection('Expense')
          //   .doc('ScA5xEf1hrvq0Y9jbRVp')
          //   .set({
          //     category: 'Fuel',
          //     amount: 502.2,
          //     dateTime: '21-10-2032',
          //     Note: 'helloo2',
          //   });
          //ADDDDDDDDD NEW ENTRy
          // await firestore().collection('Expense').add({
          //   category: 'Salary',
          //   amount: 8000,
          //   dateTime: '15-09-2023',
          //   Note: 'Neer test',
          //   cashIn: true
          // });
        }}>
        <Text>ADD</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
      onPress={()=>{
        db.transaction(function (tx) {
          tx.executeSql(
            'DROP table Expense',
            [],
            (tx, results) => {
              console.log('Results------------', results.rowsAffected);
              if (results.rowsAffected > 0) {
                // setupdate(update+1)
                navigation.goBack()
              } else {
                alert('Failed');
              }
            },
          );
        });
      }}
      >
        <Text>DELETE</Text>
      </TouchableOpacity> */}
      
      {currentTab == 'List' ? !isLoading ? (
        <ListView
          // calculation={item => calculation(item)}
          expData={expData}
          navigation={navigation}
          update={update}
        />
      ):
      <View style={{height:Dimensions.get("window").height/1.5, justifyContent:'center', alignItems:'center', }}>

        <ActivityIndicator size={"large"}/> 
      </View>
      : null}
      {currentTab == 'Overview' ? <Overview /> : null}
    </View>
  );
}

const styles = StyleSheet.create({});
