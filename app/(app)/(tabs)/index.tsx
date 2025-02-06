import { StyleSheet, View } from 'react-native';
import React from 'react';
import ThText from '@/components/text';
import Layout from '@/components/layout';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <Layout className="flex-1 justify-center items-center">
      <ThText>Home Screen</ThText>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
