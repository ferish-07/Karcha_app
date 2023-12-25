import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Modal from 'react-native-modal';
import {NewIcons} from '../Utils/assets/Index';

export default function SelectType({visible, onBackdropPress, onSelectItem}) {
  // variables
  let db = openDatabase({name: 'AppData.db'});

  const [bounceValue, setBounceValue] = useState(new Animated.Value(300));
  const [categoryData, setCategoryData] = useState([]);
  // const [visible, setvisible] = useState(true);
  //Is the animated view hidden or not?
  const [isHidden, setIsHidden] = useState(true);

  //I toggle the animated slide with this method
  const toggleSlide = () => {
    var toValue = 475; //How to get dynamic height of View to animate

    if (visible) {
      //Here I hide (slide down) the animated View container
      toValue = 0;
    }

    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setIsHidden(!isHidden);
  };
  useEffect(() => {
    toggleSlide();
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

        setCategoryData(tempTo);
        // calculation({cashIn: posAmt, cashOut: negAmt});
        // setIsLoading(false);
        console.log('---------------TEMP DATAAA', tempTo);
        // setAddressesFrom(tempFrom);
        // setAddressesTo(tempTo);
      });
    });
  }, []);

  return (
    <Modal
      isVisible={visible}
      //   animationOut={'fadeOutDown'}
      style={{margin: 0}}
      onBackdropPress={() => {
        // setvisible(false);
        onBackdropPress();
        toggleSlide();
      }}>
      <Animated.View
        style={[
          styles.subView,
          {transform: [{translateY: bounceValue}]},
          {
            padding: 10,
            position: 'absolute',
            backgroundColor: 'white',
            bottom: 0,
            width: '100%',
            height: '50%',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        ]}>
        <FlatList
          data={categoryData}
          numColumns={3}
          // style={{marginTop: 25}}
          // style={{flexDirection: 'column', flexWrap: 'wrap'}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                width: '33.33%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
              onPress={() => onSelectItem(item)}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: '#f2f2f2',
                }}></View>
              <Text>{item.category_name}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={{height: 20}} />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
