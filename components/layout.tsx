import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

type Props = {
  className?: string;
} & PropsWithChildren;

const Layout = ({ className, children }: Props) => {
  return (
    <View className={`flex-1 p-8 bg-white dark:bg-black ${className}`}>
      {children}
    </View>
  );
};

export default Layout;
