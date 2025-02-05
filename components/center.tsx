import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';

const Center = (props: PropsWithChildren) => {
  return (
    <View className="flex-1 items-center justify-center">{props.children}</View>
  );
};

export default Center;
