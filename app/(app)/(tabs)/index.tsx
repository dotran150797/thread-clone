import { FlatList, View } from 'react-native';
import React from 'react';
import Layout from '@/components/layout';
import Post from '@/components/post';

const HomeScreen = () => {
  const renderItem = React.useCallback(() => {
    return <Post />;
  }, []);

  return (
    <Layout className="flex-1">
      <FlatList
        data={[1, 2, 3]}
        renderItem={renderItem}
        keyExtractor={(i) => i.toString()}
        ItemSeparatorComponent={() => <View className="h-8" />}
        className="flex-1"
      />
    </Layout>
  );
};

export default HomeScreen;
