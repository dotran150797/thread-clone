import { StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
} & PropsWithChildren;

const ThText = (props: Props) => {
  return (
    <Text className={props.className} style={{ fontFamily: 'DMSans' }}>
      {props.children}
    </Text>
  );
};

export default ThText;

const styles = StyleSheet.create({});
