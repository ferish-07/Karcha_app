import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PieChart} from './PieChart';
import {converted} from './PiechartData';

export default function Overview({amountData}) {
  const pieData = [
    {value: 50000, color: '#177AD5', text: '54%'},
    {value: 5000, color: '#79D2DE', text: '30%'},
    {value: 2000, color: '#ED6665', text: '26%'},
    {value: 500, color: 'green', text: '26%'},
  ];
  const series = [2482, 925, 920, 450, 270, 20];
  const sliceColor = [
    '#fbd203',
    '#ffb300',
    '#ff9100',
    '#ff6c00',
    '#ff3c00',
    'green',
  ];

  return (
    <View>
      <PieChart amountData={amountData} />
      <View
        style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 5}}>
        {amountData.map((i, ind) => {
          return (
            <View
              style={{
                width: '20%',
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  height: 10,
                  backgroundColor:
                    Object.values(converted)[
                      ind % Object.values(converted).length
                    ].color,
                }}
              />
              <Text>{' ' + i}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
