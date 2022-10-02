import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    Lato: require('../src/assets/fonts/Lato/Lato-Regular.ttf'),
  });
};

export default useFonts;