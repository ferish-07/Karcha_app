import {
  Animated,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDatabase} from 'react-native-sqlite-storage';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

export default function AddCategory({navigation}) {
  let db = openDatabase({name: 'AppData.db'});

  const [value, setValue] = useState('');
  const [update, setUpdate] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [refreshView, setRefreshView] = useState(0);
  const [rowRefs, setRowRef] = useState([]);
  let textInputRef = useRef();
  let row = [];
  let prevOpenedRow;

  const closeRow = (index, isDelete = false) => {
    console.log('INDEXXXXXXXX======?>>>>', index);
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      console.log('HEREEEEEEE IFFFFFFFF');

      prevOpenedRow.close();
    } else if (isDelete) {
      console.log('HEREEEEEEE ELSE');
      row[index].close();
    }
    prevOpenedRow = row[index];
  };
  const addCategory = category => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO CategoryMaster (category_name) VALUES (?)',
        [category],
        (tx, results) => {
          // console.log('Results------------', results.rowsAffected);
          if (results.rowsAffected > 0) {
            setUpdate(update + 1);
            setValue('');
          } else {
            alert('Failed');
          }
        },
      );
    });
  };
  useEffect(() => {
    // setIsLoading(true);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM CategoryMaster', [], (tx, results) => {
        // console.log('rows00000-----------------', results.rows.item(0));
        var tempFrom = [];
        var tempTo = [];
        for (let i = 0; i < results.rows.length; ++i) {
          // if (results.rows.item(i).type == 'from') {
          //   tempFrom.push(results.rows.item(i));
          // } else if (results.rows.item(i).type == 'to') {
          //   tempTo.push(results.rows.item(i));
          // }
          tempTo.push(results.rows.item(i));
          console.log(results.rows.item(i));
        }

        tempTo.map(i => {
          i.isEdited = false;
        });

        setCategoryData(tempTo);
        // calculation({cashIn: posAmt, cashOut: negAmt});
        // setIsLoading(false);
        console.log('---------------TEMP DATAAA', tempTo);
        // setAddressesFrom(tempFrom);
        // setAddressesTo(tempTo);
      });
    });
  }, [update]);
  const renderLeftActions = (item, index) => {
    console.log('--------ITEM', item);
    return (
      <View
        style={{
          // backgroundColor: 'red',
          // padding: 8,
          marginTop: 10,
          justifyContent: 'center',

          width: '15%',
          alignItems: 'center',
          // borderRadius: 50,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            categoryData.map(i => {
              if (i.id == item.id) {
                i.isEdited = true;
              } else {
                i.isEdited = false;
              }
            });
            setRefreshView(refreshView + 1);
            closeRow(index, true);
            // setTimeout(() => {
            textInputRef.current.focus();

            // }, 500);
          }}>
          <Text>
            <Icon name={'pencil-outline'} size={20} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderRightActions = (item, index) => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          // padding: 8,
          marginTop: 10,
          justifyContent: 'center',

          width: '15%',
          alignItems: 'center',
          // borderRadius: 50,
        }}
        onPress={this.close}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            <Icon name={'trash-outline'} size={20} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        navigation={navigation}
        screen={'normal'}
        title={'Add Category'}
        isbackArror={false}
      />
      <View
        style={{
          marginHorizontal: 4,
          flexDirection: 'row',
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            // backgroundColor: 'green',
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={'file-tray-full-outline'} size={25} />
        </View>
        <TextInput
          placeholder="Category"
          style={{
            width: '80%',
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            padding: 8,
            fontSize: 18,
          }}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            disabled={value == '' ? true : false}
            style={{
              backgroundColor: 'green',
              width: 35,
              height: 35,
              // width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={() => {
              addCategory(value);
            }}>
            <Icon name={'add-outline'} size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={categoryData}
          extraData={refreshView}
          style={{marginTop: 8, marginHorizontal: 8}}
          renderItem={({item, index}) => (
            <View>
              <Swipeable
                ref={ref => {
                  row[index] = ref;
                  rowRefs.push(row[index]);
                }}
                renderLeftActions={() => renderLeftActions(item, index)}
                renderRightActions={() => renderRightActions(item, index)}
                leftThreshold={-10}
                rightThreshold={-10}>
                <View
                  style={{
                    backgroundColor: item.isEdited ? 'red' : 'white',
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <TextInput
                    ref={textInputRef}
                    value={item.category_name}
                    editable={item.isEdited ? true : false}
                    autoFocus={true}
                    style={{fontSize: 18}}
                  />
                </View>
              </Swipeable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
