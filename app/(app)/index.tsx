import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThText from '@/components/text';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ThText>Home Screen</ThText>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
