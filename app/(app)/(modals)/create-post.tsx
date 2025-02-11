import React from 'react';

import {
  InputAccessoryView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUser } from '@clerk/clerk-expo';
import clsx from 'clsx';

import Avatar from '@/components/avatar';
import Layout from '@/components/layout';
import ThText from '@/components/text';

type Props = {};
const inputAccessoryViewID = 'new-post-input-accessory-view';

const CreatePostModal = (props: Props) => {
  const { user } = useUser();
  const [value, setInputValue] = React.useState('');

  return (
    <Layout>
      <View className="flex-row flex-1">
        <Avatar className="w-16 h-16 rounded-full" source={user?.imageUrl} />
        <View className="pl-4">
          <ThText className="font-semibold">{user?.fullName}</ThText>
          <TextInput
            value={value}
            onChangeText={setInputValue}
            inputAccessoryViewID={inputAccessoryViewID}
            autoFocus
            className="mt-1 dark:color-white"
            placeholder="What's new?"
          />
        </View>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <TouchableOpacity
            disabled={value.length === 0}
            className={clsx(
              'self-end w-20 items-center mr-4 mb-4 pt-2 pb-2 rounded-3xl',
              value.length === 0 ? 'bg-gray-400' : 'bg-black dark:bg-white'
            )}
          >
            <ThText className="font-medium text-lg dark:color-black color-white">Post</ThText>
          </TouchableOpacity>
        </InputAccessoryView>
      </View>
    </Layout>
  );
};

export default CreatePostModal;
