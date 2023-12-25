import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PieChart} from './PieChart';
export default function Overview() {
  const pieData = [
    {value: 54, color: '#177AD5', text: '54%'},
    {value: 40, color: '#79D2DE', text: '30%'},
    {value: 20, color: '#ED6665', text: '26%'},
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
      <PieChart />
    </View>
  );
}

const styles = StyleSheet.create({});
