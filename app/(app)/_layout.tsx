import React from 'react';

import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

const AppLayout = () => {
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
