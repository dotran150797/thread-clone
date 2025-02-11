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
import * as mime from '@shopify/mime-types';
import clsx from 'clsx';
import { useMutation } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import Avatar from '@/components/avatar';
import Layout from '@/components/layout';
import ListImage from '@/components/list-image';
import ThText from '@/components/text';

import { DARK_COLOR, HIT_SLOP, WHITE_COLOR } from '@/utils/constants';

import useCurrentUser from '@/hooks/useCurrentUser';
import useIsDarkMode from '@/hooks/useIsDarkMode';

type Props = {};
const inputAccessoryViewID = 'new-post-input-accessory-view';

const CreatePostModal = (props: Props) => {
  const currentUser = useCurrentUser();
  const [value, setInputValue] = React.useState('');
  const isDarkMode = useIsDarkMode();
  const router = useRouter();
  const [images, setImages] = React.useState<Array<ImagePicker.ImagePickerAsset>>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const createPost = useMutation(api.posts.createPostMutation);

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const selectImage = React.useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  }, []);

  const uploadImages = async (images: ImagePicker.ImagePickerAsset[]) => {
    const uploadedUrls = [];

    for (const image of images) {
      const imageUri = image.uri;
      const extension = imageUri.split('.').pop() || '';
      const mimeType = mime.getMimeTypeFromFilename(extension) || 'application/octet-stream';

      // Get presigned URL from Convex
      const postUrl = await generateUploadUrl();

      // Convert URI to blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Upload to Convex storage
      const result = await fetch(postUrl, {
        method: 'POST',
        body: blob,
        headers: {
          'Content-Type': mimeType,
        },
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const storageId = await result.text();
      uploadedUrls.push(JSON.parse(storageId).storageId);
    }

    return uploadedUrls;
  };

  const onCreatePost = React.useCallback(async () => {
    try {
      setIsLoading(true);

      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImages(images);
      }

      await createPost({
        user_id: currentUser?._id as Id<'users'>,
        content: value,
        image_url: imageUrls as string[],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setInputValue('');
      router.dismiss();
    }
  }, [value, currentUser, images]);

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
            multiline
          />

          <ListImage images={images.map((image) => image.uri)} />

          <TouchableOpacity onPress={selectImage} hitSlop={HIT_SLOP}>
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
