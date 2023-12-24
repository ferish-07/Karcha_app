import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Modal from 'react-native-modal';

export default function SelectType() {
  // variables
  let db = openDatabase({name: 'AppData.db'});

  const [bounceValue, setBounceValue] = useState(new Animated.Value(300));
  const [categoryData, setCategoryData] = useState([]);
  const [visible, setvisible] = useState(true);
  //Is the animated view hidden or not?
  const [isHidden, setIsHidden] = useState(true);

  //I toggle the animated slide with this method
  const toggleSlide = () => {
    var toValue = 475; //How to get dynamic height of View to animate

    if (isHidden) {
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
        setvisible(false);
        toggleSlide();
      }}>
      <Animated.View
        style={[
          styles.subView,
          {transform: [{translateY: bounceValue}]},
          {
            padding: 10,
            position: 'absolute',
            backgroundColor: 'red',
            bottom: 0,
            width: '100%',
          },
        ]}>
        <View>
          {categoryData.map((products, index) => {
            return (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text style={{fontSize: 14, color: 'rgb(68,68,68)'}}>
                  Product: {index + 1}
                </Text>
              </View>
            );
          })}
        </View>
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
