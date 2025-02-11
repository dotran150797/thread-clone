import React from 'react';

import { Pressable } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack, useRouter } from 'expo-router';

import ThText from '@/components/text';

import { DARK_COLOR, HIT_SLOP, WHITE_COLOR } from '@/utils/constants';

import useIsDarkMode from '@/hooks/useIsDarkMode';

const AppLayout = () => {
  const { isSignedIn } = useAuth();
  const isDarkMode = useIsDarkMode();
  const router = useRouter();

  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/create-post"
        options={{
          presentation: 'modal',
          headerTitle: () => <ThText className="text-xl font-bold">Create thread</ThText>,
          headerLeft: () => (
            <Pressable hitSlop={HIT_SLOP} onPress={router.back}>
              <ThText className="text-lg">Cancel</ThText>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: isDarkMode ? DARK_COLOR : WHITE_COLOR,
          },
        }}
      />
    </Stack>
  );
};

export default AppLayout;
