import React from 'react';
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

type Props = {};

const AppLayout = (props: Props) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />;
  }

  return <Slot />;
};

export default AppLayout;
