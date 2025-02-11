import React from 'react';

import { Pressable, TouchableOpacity, View } from 'react-native';

import { AntDesign, Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { cssInterop, useColorScheme } from 'nativewind';

import { DARK_COLOR, WHITE_COLOR } from '@/utils/constants';

import ThText from './text';

cssInterop(Image, { className: 'style' });

type Props = {};

const POST_ICONS = [
  {
    name: 'heart-outline',
    Wrapper: Ionicons,
  },
  {
    name: 'comment-o',
    Wrapper: FontAwesome,
  },
  {
    name: 'retweet',
    Wrapper: AntDesign,
  },
  {
    name: 'send',
    Wrapper: Feather,
  },
];

const Post = (props: Props) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 flex-row content-center">
      <Image source={'https://picsum.photos/200'} className="w-[50] h-[50] rounded-full" />
      <View className="pl-2 mt-[-4] flex-1">
        <View className="flex-row justify-between">
          <ThText className="text-xl font-bold">Ruchi_shah</ThText>
          <View className="flex-row">
            <ThText className="mr-6 color-[#A0A0A0]">5m</ThText>
            <Pressable>
              <Entypo
                color={colorScheme === 'light' ? DARK_COLOR : WHITE_COLOR}
                name="dots-three-horizontal"
              />
            </Pressable>
          </View>
        </View>
        <ThText className="text-lg pt-2">
          Failures are stepping stones to success. Embrace them, learn from them, and keep moving
          forward
        </ThText>
        <View className="flex-row gap-3 mt-2">
          {POST_ICONS.map(({ name, Wrapper }, index) => (
            <TouchableOpacity key={index + name}>
              <Wrapper
                // @ts-ignore
                name={name}
                size={22}
                color={colorScheme === 'light' ? DARK_COLOR : WHITE_COLOR}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Post;
