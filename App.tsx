import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { HomePage } from './src/components/homepage/homepage';
import { Register } from './src/components/register/register';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeRouter, Route, Routes, Link } from 'react-router-native';
import { Login } from './src/components/login/login';
import { Home } from './src/components/homescreen/home';

export const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    void (async () => {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        Lato: require('./assets/fonts/Lato/Lato-Regular.ttf'),
        LatoBold: require('./assets/fonts/Lato/Lato-Bold.ttf'),
        LatoLight: require('./assets/fonts/Lato/Lato-Light.ttf'),
        LatoThin: require('./assets/fonts/Lato/Lato-Thin.ttf'),
        LatoItalic: require('./assets/fonts/Lato/Lato-Italic.ttf'),
        LatoBoldItalic: require('./assets/fonts/Lato/Lato-BoldItalic.ttf'),
        LatoLightItalic: require('./assets/fonts/Lato/Lato-LightItalic.ttf'),
        Superior: require('./assets/fonts/Superior/Superior-Title-Regular.otf'),
        SuperiorLight: require('./assets/fonts/Superior/Superior-Title-Light.otf'),
        SuperiorBold: require('./assets/fonts/Superior/Superior-Title-Bold.ttf')
      });
      setAppIsReady(true);
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NativeRouter>
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>
        <TailwindProvider utilities={utilities}>
          <StatusBar hidden />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </TailwindProvider>
      </View>
    </NativeRouter>
  );
};
