import React from 'react';

import { ScrollView, View } from 'react-native';

import { Image } from 'expo-image';

type Props = {
  images?: string[];
};

const ListImage = ({ images }: Props) => {
  if (images?.length === 0) {
    return;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      className="h-auto max-h-60"
      contentContainerStyle={{ gap: 15 }}
    >
      {images?.map((image) => (
        <View key={image} className="mt-4">
          <Image source={{ uri: image }} className="w-52 h-52 rounded-lg" />
        </View>
      ))}
    </ScrollView>
  );
};

export default ListImage;
