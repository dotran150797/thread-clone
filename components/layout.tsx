import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  className?: string;
} & PropsWithChildren;

const Layout = ({ className, children }: Props) => {
  return (
    <SafeAreaView className={`flex-1 p-12 ${className}`}>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
