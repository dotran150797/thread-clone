import React from 'react';

import { Pressable, TouchableOpacity, View } from 'react-native';

import { PostWithAuthor } from '@/convex/posts';
import { AntDesign, Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { cssInterop, useColorScheme } from 'nativewind';

import { DARK_COLOR, WHITE_COLOR } from '@/utils/constants';

import ListImage from './list-image';
import ThText from './text';

cssInterop(Image, { className: 'style' });

type Props = {
  post: PostWithAuthor;
};

const Post = ({ post }: Props) => {
  const { colorScheme } = useColorScheme();

  const timeDiff = React.useMemo(() => {
    const mins = dayjs().diff(dayjs(post.createdAt), 'm');
    const MINS_IN_DAY = 1440;
    if (mins < 60) {
      return `${mins}m`;
    } else if (mins < MINS_IN_DAY) {
      return `${Math.floor(mins / 60)}h`;
    } else {
      return `${Math.floor(mins / MINS_IN_DAY)}d`;
    }
  }, [post.createdAt]);

  return (
    <View className="flex-1 flex-row content-center">
      <Image source={post.author?.image_url} className="w-[50] h-[50] rounded-full" />
      <View className="pl-2 mt-[-4] flex-1">
        <View className="flex-row justify-between">
          <ThText className="text-xl font-bold">{post.author?.displayName}</ThText>
          <View className="flex-row mt-2">
            <ThText className="mr-6 color-[#A0A0A0]">{timeDiff}</ThText>
            <Pressable>
              <Entypo
                color={colorScheme === 'light' ? DARK_COLOR : WHITE_COLOR}
                name="dots-three-horizontal"
              />
            </Pressable>
          </View>
        </View>
        <ThText className="text-lg pt-1">{post.content}</ThText>
        <ListImage images={post?.image_url} />
        <View className="flex-row gap-3 mt-2">
          <PostIcons />
        </View>
      </View>
    </View>
  );
};

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

const PostIcons = () => {
  const { colorScheme } = useColorScheme();
  return (
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
  );
};

export default Post;
