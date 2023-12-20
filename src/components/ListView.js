import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {assets} from '../Utils/assets/Index';
import {openDatabase} from 'react-native-sqlite-storage';
import moment from 'moment';

export default function ListView({navigation, update, expData}) {
  // const [expData, setExpData] = useState([]);
  let db = openDatabase({name: 'AppData.db'});

  // useEffect(() => {
  //   // getData();
  //   const sub = firestore()
  //     .collection('Expense')
  //     .onSnapshot(query => {
  //       console.log(
  //         '-0-------------------------------------------query-----------',
  //         query,
  //       );
  //       let exp = [];
  //       query.forEach(d => {
  //         exp.push({
  //           ...d.data(),
  //           key: d.id,
  //         });
  //         console.log(
  //           '-------------------dgdgdgdgdgdgdgdgdg-------------------------------',
  //           exp.reduce((a, b) => a + b.amount, 0),
  //           d.id,
  //           d.data()
  //         );
  //       });
  //       const newData = exp.reduce((acc, item) => {
  //         const existingDate = acc.find(entry => entry.date === item.dateTime);
  //         if (existingDate) {
  //           existingDate.children.push(item);
  //         } else {
  //           acc.push({date: item.dateTime, children: [item]});
  //         }
  //         return acc;
  //       }, []);
  //       newData.sort((a, b) => {
  //         var dateA = new Date(a.date);
  //         var dateB = new Date(b.date);
  //         console.log("-------DATEEEE A-------", dateA, a.date);
  //         return dateB - dateA;
  //       });
  //       let negAmt = 0;
  //       let posAmt = 0;
  //       newData.map(i => {
  //         i.children.map(i2 => {
  //           if (i2.cashIn) {
  //             posAmt = posAmt + i2.amount;
  //           } else {
  //             negAmt = negAmt + i2.amount;
  //           }
  //         });
  //       });
  //       setExpData(newData);
  //       calculation({cashIn: posAmt, cashOut: negAmt});
  //     });
  //   return () => sub;
  // }, []);

  // useEffect(()=>{
  //   db.transaction(tx => {
  //     tx.executeSql(`SELECT * FROM Expense WHERE strftime('%Y', dateTime) = ?`, [`2023`], (tx, results) => {
  //       console.log('rows00000-- NEWW DGAFDH---------------', results.rows.item(0));
  //       var tempFrom = [];
  //       var tempTo = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         // if (results.rows.item(i).type == 'from') {
  //         //   tempFrom.push(results.rows.item(i));
  //         // } else if (results.rows.item(i).type == 'to') {
  //         //   tempTo.push(results.rows.item(i));
  //         // }
  //         tempTo.push(results.rows.item(i))
  //         console.log(results.rows.item(i));
  //       }

  //       console.log("---------------TEMP newwwwwwwwwww", tempTo)
  //       // setAddressesFrom(tempFrom);
  //       // setAddressesTo(tempTo);
  //     });
  //   })
  // },[])
  const _renderItem = (item, indexs) => {
    return (
      <View style={{backgroundColor: 'white', marginTop: indexs > 0 ? 15 : 0}}>
        <View
          style={{
            padding: 10,
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{fontSize: 16}}>
            {moment(item.date).format('DD-MM-YYYY')}
          </Text>
        </View>
        {item.children.map((item1, index1) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() =>
                navigation.navigate('valueEntry', {
                  cashIn: item1.cashIn ? true : false,
                  isEdit: true,
                  item: item1,
                })
              }>
              <View
                style={{
                  width: '10%',
                  //   backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 16,
                }}>
                <Image
                  source={assets.drawerMenu}
                  style={{width: 25, height: 25}}
                />
              </View>
              <View
                style={{
                  //   backgroundColor: 'green',
                  width: '70%',
                  justifyContent: 'center',
                  paddingLeft: 8,
                }}>
                <View>
                  <Text style={{fontSize: 18, color: 'black'}}>
                    {item1.category}
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 16, color: 'grey'}}>
                    {item1.Note}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: item1.cashIn ? 'green' : 'red',
                  }}>
                  {item1.cashIn ? item1.amount : '-' + item1.amount}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={expData}
          style={{height: '90%'}}
          renderItem={({item, index}) => _renderItem(item, index)}
          ListEmptyComponent={() => (
            <View
              style={{
                height: Dimensions.get('screen').height / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, color: 'red'}}>NO DATA FOUND</Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          // position: 'absolute',
          backgroundColor: 'white',
          // bottom: 50,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',

          // paddingBottom:50,
          // height:"20%"
          // paddingTop:10
          // height:100
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#45bd36',
            width: '40%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('valueEntry', {cashIn: true})}>
          <Text style={{color: 'white', fontSize: 18}}>Cash In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#da2a1a',
            width: '40%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('valueEntry', {cashIn: false})}>
          <Text style={{color: 'white', fontSize: 18}}>Cash Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 20, backgroundColor: 'white'}} />
    </View>
  );
}

const styles = StyleSheet.create({});
