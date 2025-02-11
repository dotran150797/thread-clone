import React, { useCallback, useState } from 'react';

import { ActivityIndicator, FlatList, ListRenderItem, RefreshControl, View } from 'react-native';

import { api } from '@/convex/_generated/api';
import { PostWithAuthor } from '@/convex/posts';
import { useQuery } from 'convex/react';

import Layout from '@/components/layout';
import Post from '@/components/post';

import useCurrentUser from '@/hooks/useCurrentUser';

const INITIAL_PAGE_SIZE = 10;

const HomeScreen = () => {
  const currentUser = useCurrentUser();
  const [cursor, setCursor] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const paginatedPosts = useQuery(api.posts.getPostsByUser, {
    user_id: currentUser?._id!,
    paginationOpts: { numItems: INITIAL_PAGE_SIZE, cursor },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCursor(null);
    // Convex will automatically refresh the data
    setRefreshing(false);
  }, []);

  const loadMore = useCallback(() => {
    if (paginatedPosts?.isDone) return;
    setCursor(paginatedPosts?.continueCursor ?? null);
  }, [paginatedPosts?.continueCursor, paginatedPosts?.isDone]);

  const renderFooter = useCallback(() => {
    if (!paginatedPosts?.isDone) {
      return <ActivityIndicator />;
    }
    return null;
  }, [paginatedPosts?.isDone]);

  const renderItem: ListRenderItem<PostWithAuthor> = React.useCallback(({ item }) => {
    return <Post post={item} />;
  }, []);

  return (
    <Layout className="flex-1">
      <FlatList
        data={paginatedPosts?.posts}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <View className="h-8" />}
        className="flex-1"
        ListFooterComponent={renderFooter}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default HomeScreen;
