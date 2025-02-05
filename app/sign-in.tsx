import React from 'react';
import Layout from '@/components/layout';
import ThImage from '@/components/image';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ThreadLogo from '@/assets/svg/thread-logo';
import ThText from '@/components/text';

type Props = {};

const SignIn = (props: Props) => {
  return (
    <View className="flex-1 items-center bg-white dark:bg-black">
      <ThreadLogo />

      <View className="w-full h-20 mt-20">
        <TouchableOpacity className="flex-1 mr-10 ml-10 border rounded-3xl border-[#DDDBDB]">
          <View className="flex-1 flex-row items-center p-5 justify-between">
            <ThText className="font-medium text-lg color-[#B2B3B2]">
              Log in with Instagram
            </ThText>
            <ThImage
              style={styles.image}
              source={require('@/assets/images/Instagram_logo.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: 48,
    aspectRatio: 1,
  },
});
