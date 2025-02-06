import React from 'react';
import { Redirect, Slot, Stack, Tabs } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

type Props = {};

const AppLayout = (props: Props) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
