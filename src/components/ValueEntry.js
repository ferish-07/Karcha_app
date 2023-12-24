import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from './CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {openDatabase} from 'react-native-sqlite-storage';
import SelectType from './SelectType';

export default function ValueEntry({route, navigation}) {
  const {cashIn, isEdit, item} = route.params;

  const [typeFocused, setTypeFocused] = useState(true);
  const [amtFocus, setAmtFocus] = useState(false);
  const [calendarFocus, setCalendarFocus] = useState(false);
  const [noteFocus, setNoteFocus] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  let db = openDatabase({name: 'AppData.db'});
  const [categoryValue, setCategoryValue] = useState('');
  const [AmountValue, setAmountValue] = useState(0);
  const [notesValue, setNotesValue] = useState('');

  useEffect(() => {
    if (isEdit) {
      // console.log("------------EDIT ITEM-----------------", item)
      setCategoryValue(item.category);
      setAmountValue(item.amount);
      setNewDate(moment(item.dateTime).format('YYYY-MM-DD HH:MM:SS'));
      setNotesValue(item.Note);
    }
  }, []);

  const addData = (category, amount, date, note) => {
    let value = cashIn ? true : false;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Expense (category, amount, dateTime, Note, cashIn) VALUES (?,?,?,?,?)',
        [category, amount, date, note, value],
        (tx, results) => {
          // console.log('Results------------', results.rowsAffected);
          if (results.rowsAffected > 0) {
            // setupdate(update+1)
            navigation.goBack();
          } else {
            alert('Failed');
          }
        },
      );
    });
  };
  const updateData = (category, amount, date, note, id) => {
    let value = cashIn ? true : false;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Expense set category=?, amount=?, dateTime=?, Note=?,cashIn=? WHERE id=?',
        [category, amount, date, note, value, id],
        (tx, results) => {
          // console.log('Results------------', results);
          if (results.rowsAffected > 0) {
            // setupdate(update+1)
            navigation.goBack();
          } else {
            alert('Failed');
          }
        },
      );
    });
  };
  const deleteData = id => {
    console.log('----DELETE ID---', id);
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM Expense WHERE id=?', [id], (tx, results) => {
        // console.log('Results------------', results.rowsAffected);
        if (results.rowsAffected > 0) {
          // setupdate(update+1)
          navigation.goBack();
        } else {
          alert('Failed');
        }
      });
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        navigation={navigation}
        screen={'normal'}
        title={cashIn ? 'Cash In' : 'Cash Out'}
        isEdit={isEdit}
        deletePressed={() => deleteData(item.id)}
        isbackArror={true}
      />

      <TouchableOpacity
        style={{flex: 1, backgroundColor: 'white'}}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}>
        <View style={{flexDirection: 'row', padding: 8}}>
          <View style={{justifyContent: 'center'}}>
            <Icon
              name={'grid'}
              size={25}
              color={cashIn ? '#45bd36' : '#da2a1a'}
            />
          </View>
          <TextInput
            placeholder="Type"
            placeholderTextColor={'grey'}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: typeFocused
                ? cashIn
                  ? '#45bd36'
                  : '#da2a1a'
                : 'grey',
              width: '90%',
              marginLeft: 8,
              padding: 5,
            }}
            onFocus={() => {
              setTypeFocused(true);
              setAmtFocus(false);
              setNoteFocus(false);
              setCalendarFocus(false);
            }}
            onChangeText={text => setCategoryValue(text)}
            value={isEdit ? categoryValue : null}
          />
        </View>
        <View style={{flexDirection: 'row', padding: 8, marginTop: 10}}>
          <View style={{justifyContent: 'center'}}>
            <Icon
              name={'wallet'}
              size={25}
              color={cashIn ? '#45bd36' : '#da2a1a'}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: amtFocus
                ? cashIn
                  ? '#45bd36'
                  : '#da2a1a'
                : 'grey',
              width: '90%',
              marginLeft: 8,
              padding: 5,
              flexDirection: 'row',
            }}>
            <TextInput
              keyboardType="numeric"
              placeholderTextColor={'grey'}
              placeholder="Amount"
              style={{width: '94%'}}
              onFocus={() => {
                setTypeFocused(false);
                setAmtFocus(true);
                setNoteFocus(false);
                setCalendarFocus(false);
              }}
              onChangeText={text => setAmountValue(text)}
              value={isEdit ? AmountValue.toString() : null}
            />
            <View>
              <Text>INR</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 8, marginTop: 10}}>
          <View style={{justifyContent: 'center'}}>
            <Icon
              name={'calendar'}
              size={25}
              color={cashIn ? '#45bd36' : '#da2a1a'}
            />
          </View>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: calendarFocus
                ? cashIn
                  ? '#45bd36'
                  : '#da2a1a'
                : 'grey',
              width: '90%',
              marginLeft: 8,
              padding: 5,
              flexDirection: 'row',
            }}
            onPress={() => {
              setTypeFocused(false);
              setAmtFocus(false);
              setNoteFocus(false);
              setCalendarFocus(true);
              setOpenCalendar(true);
            }}>
            <View>
              <Text>{moment(newDate).format('DD-MM-YYYY')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', padding: 8, marginTop: 10}}>
          <View style={{justifyContent: 'center'}}>
            <Icon2
              name={'edit'}
              size={25}
              color={cashIn ? '#45bd36' : '#da2a1a'}
            />
          </View>

          <TextInput
            placeholder="Note"
            placeholderTextColor={'grey'}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: noteFocus
                ? cashIn
                  ? '#45bd36'
                  : '#da2a1a'
                : 'grey',
              width: '90%',
              marginLeft: 8,
              padding: 5,
              maxHeight: 100,
            }}
            onFocus={() => {
              setTypeFocused(false);
              setAmtFocus(false);
              setNoteFocus(true);
              setCalendarFocus(false);
            }}
            multiline
            onChangeText={text => setNotesValue(text)}
            value={isEdit ? notesValue : null}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        date={new Date(newDate)}
        isVisible={openCalendar}
        mode="date"
        onConfirm={date => {
          setNewDate(moment(date).format('YYYY-MM-DD HH:MM:SS'));
          setOpenCalendar(!openCalendar);
        }}
        onCancel={() => setOpenCalendar(!openCalendar)}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={
            isEdit
              ? item.category == categoryValue &&
                item.amount == AmountValue &&
                moment(item.dateTime).format('DD-MM-YYYY') ==
                  moment(newDate).format('DD-MM-YYYY') &&
                item.Note == notesValue
                ? true
                : false
              : false
          }
          style={{
            backgroundColor: cashIn ? '#45bd36' : '#da2a1a',
            width: '50%',
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            // console.log("=====-=-=-=-=-=ITEM CLICKKEDDDDDD-=-=-=-=-=-=-=-=")
            if (isEdit) {
              updateData(
                categoryValue,
                AmountValue,
                newDate,
                notesValue,
                item.id,
              );
            } else {
              addData(categoryValue, AmountValue, newDate, notesValue);
            }
          }}>
          <View>
            <Text style={{fontSize: 16, color: 'white'}}>
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <SelectType />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
