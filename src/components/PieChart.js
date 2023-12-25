import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {generatePieChartData} from './PiechartData';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const PieChartSegment = ({
  center,
  radius,
  strokeWidth,
  color,
  circumference,
  angle,
  percent,
  progress,
}) => {
  console.log(
    'abgsdfabgsfjagsdjbasjkdbakjsbdjkasbdjkasbdjkabsdjbasd',
    generatePieChartData(),
  );
  const [text, setText] = useState('Hello, world!');

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);
    return {
      strokeDashoffset,
      transform: [
        {translateX: center},
        {translateY: center},
        {rotate: `${rotateAngle}deg`},
        {translateX: -center},
        {translateY: -center},
      ],
    };
  });
  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      originX={center}
      originY={center}
      animatedProps={animatedProps}
    />
  );
};

export const PieChart = ({size = 200, strokeWidth = 50}) => {
  const progress = useSharedValue(0);
  const [data, setData] = React.useState([]);
  const [startAngles, setStartAngles] = React.useState([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const refresh = () => {
    const generatedData = generatePieChartData();
    let angle = 0;
    const angles = [];
    generatedData.forEach(item => {
      angles.push(angle);
      angle += item.percent * 360;
    });
    setData(generatedData);
    setStartAngles(angles);
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
    });
  };
  useEffect(() => {
    refresh();
  }, []);
  return (
    <View style={{}}>
      <Text style={styles.titleStyle}>Pie Chart</Text>
      <View
        style={[
          {width: size, height: size, alignSelf: 'center'},
          styles.rotate,
        ]}>
        <Svg viewBox={`0 0 ${size} ${size}`} style={StyleSheet.absoluteFill}>
          {data.map((item, index) => (
            <PieChartSegment
              key={`${item.color}-${index}`}
              center={center}
              radius={radius}
              circumference={circumference}
              angle={startAngles[index]}
              color={item.color + 45}
              percent={item.percent}
              strokeWidth={strokeWidth}
              progress={progress}
            />
          ))}
        </Svg>
        <View
          style={[
            styles.buttonWrap,
            styles.rotateText,
            {backgroundColor: 'red'},
          ]}>
          <Button title="Refresh" onPress={refresh} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  rotate: {
    transform: [{rotateZ: '-90deg'}],
  },
  rotateText: {
    transform: [{rotateZ: '90deg'}],
  },
  buttonWrap: {marginTop: 20},
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
