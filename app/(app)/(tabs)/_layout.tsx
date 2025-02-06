import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useColorScheme } from 'nativewind';

type Props = {};

const ICON_SIZE = 30;

const TabLayout = (props: Props) => {
  const { colorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const iconColor = isDarkMode ? 'white' : 'black';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={ICON_SIZE}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'search-sharp' : 'search-outline'}
              size={ICON_SIZE}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: 'Create Post',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'create' : 'create-outline'}
              size={ICON_SIZE}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'heart-sharp' : 'heart-outline'}
              size={ICON_SIZE}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle-outline'}
              size={ICON_SIZE}
              color={iconColor}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
