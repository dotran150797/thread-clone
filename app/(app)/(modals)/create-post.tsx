import React from 'react';

import {
  ActivityIndicator,
  InputAccessoryView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { SimpleLineIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { useMutation } from 'convex/react';
import { useRouter } from 'expo-router';

import Avatar from '@/components/avatar';
import Layout from '@/components/layout';
import ThText from '@/components/text';

import { DARK_COLOR, HIT_SLOP, WHITE_COLOR } from '@/utils/constants';

import { useConvexLoading } from '@/hooks/useConvexLoading';
import useCurrentUser from '@/hooks/useCurrentUser';
import useIsDarkMode from '@/hooks/useIsDarkMode';

type Props = {};
const inputAccessoryViewID = 'new-post-input-accessory-view';

const CreatePostModal = (props: Props) => {
  const currentUser = useCurrentUser();
  const [value, setInputValue] = React.useState('');
  const isDarkMode = useIsDarkMode();
  const router = useRouter();

  const createPost = useMutation(api.posts.createPostMutation);
  const isLoading = useConvexLoading(createPost);

  const onCreatePost = React.useCallback(async () => {
    try {
      await createPost({
        user_id: currentUser?._id as Id<'users'>,
        content: value,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setInputValue('');
      router.dismiss();
    }
  }, [value, currentUser]);

  return (
    <Layout>
      <View className="flex-row flex-1">
        <Avatar className="w-16 h-16 rounded-full" source={currentUser?.image_url} />
        <View className="pl-4">
          <ThText className="font-semibold">{currentUser?.displayName}</ThText>
          <TextInput
            value={value}
            onChangeText={setInputValue}
            inputAccessoryViewID={inputAccessoryViewID}
            autoFocus
            className="mt-1 dark:color-white"
            placeholder="What's new?"
          />

          <TouchableOpacity hitSlop={HIT_SLOP}>
            <SimpleLineIcons
              className="pt-2"
              size={20}
              name="camera"
              color={isDarkMode ? WHITE_COLOR : DARK_COLOR}
            />
          </TouchableOpacity>
        </View>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <TouchableOpacity
            onPress={onCreatePost}
            disabled={value.length === 0}
            className={clsx(
              'self-end w-20 items-center mr-4 mb-4 pt-2 pb-2 rounded-3xl',
              value.length === 0 ? 'bg-gray-400' : 'bg-black dark:bg-white'
            )}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <ThText className="font-medium text-lg dark:color-black color-white">Post</ThText>
            )}
          </TouchableOpacity>
        </InputAccessoryView>
      </View>
    </Layout>
  );
};

export default CreatePostModal;
