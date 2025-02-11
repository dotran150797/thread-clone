import React from 'react';

import { Image, ImageProps } from 'expo-image';

interface Props extends ImageProps {}

const Avatar = (props: Props) => {
  return <Image {...props} />;
};

export default Avatar;
