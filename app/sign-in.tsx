import React, { useState } from 'react';
import ThImage from '@/components/image';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ThreadLogo from '@/assets/svg/thread-logo';
import ThText from '@/components/text';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

type Props = {};

const SignIn = (props: Props) => {
  const { startSSOFlow } = useSSO();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = React.useCallback(async () => {
    try {
      setIsLoading(true);

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_facebook',
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.replace('/(app)');
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View className="flex-1 items-center bg-white dark:bg-black">
      <ThreadLogo />
      <View className="w-full h-20 mt-20">
        <TouchableOpacity
          onPress={handleSignIn}
          className="flex-1 mr-10 ml-10 border rounded-3xl border-[#DDDBDB]"
        >
          <View className="flex-1 flex-row items-center p-5 justify-between">
            <ThText className="font-medium text-lg color-[#B2B3B2]">
              Log in with Instagram
            </ThText>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <ThImage
                style={styles.image}
                source={require('@/assets/images/Instagram_logo.png')}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  image: {
    width: 48,
    aspectRatio: 1,
  },
});
