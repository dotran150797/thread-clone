import React, { PropsWithChildren } from 'react';

import { Text } from 'react-native';

type Props = {
  className?: string;
} & PropsWithChildren;

const ThText = (props: Props) => {
  return (
    <Text className={`dark:color-white ${props.className}`} style={{ fontFamily: 'DMSans' }}>
      {props.children}
    </Text>
  );
};

export default ThText;
