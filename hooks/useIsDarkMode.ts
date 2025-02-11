import { useColorScheme } from 'nativewind';

const useIsDarkMode = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return isDarkMode;
};

export default useIsDarkMode;
