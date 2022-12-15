import React, { useCallback } from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, ImageBackground } from 'react-native';
import { SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { useNavigate } from 'react-router-native';

export const HomePage = () => {
  const tailwind = useTailwind();
  const navigate = useNavigate();
  const navigateToRegister = useCallback(
    () => navigate('/register', { replace: true }),
    [navigate]
  );
  const navigateToLogin = useCallback(() => navigate('/login', { replace: true }), [navigate]);
  const navigateToEC2 = useCallback(() => navigate('/EC2', { replace: true }), [navigate]);
  return (
    <View style={tailwind('flex flex-col h-full items-center z-50 w-full')}>
      <View style={tailwind('flex w-full max-w-[100%] max-h-[50%] h-[50%] bg-primary-200 z-10')}>
        <ImageBackground
          style={tailwind('w-full h-full')}
          resizeMode='cover'
          source={require('../../../assets/arnaque.png')}
        />
      </View>
      <View style={tailwind('flex flex-col items-center mx-2 w-full')}>
        <Image
          style={tailwind('max-w-[65%] lg:max-w-[75%] mt-2 lg:mt-4')}
          resizeMode='contain'
          source={require('../../../assets/Cozette.png')}
        />
        <View style={tailwind('-mt-1 lg:mt-2 p-0')}>
          <AppText
            style={tailwind('text-xl lg:text-2xl font-semibold text-center')}
            font='Superior'>
            Bienvenue chez Cozette, {'\n'} les amoureux de Lille.
          </AppText>
        </View>
        <SimpleButton
          accessibilityLabel='Learn more about this purple button'
          buttonClasses='mt-5 lg:mt-10 w-[300px] py-3'
          contentClasses='text-base'
          content="S'inscrire gratuitement"
          variant='contained'
          color='primary'
          onPress={navigateToRegister}
          font='LatoBold'
        />
        <SimpleButton
          accessibilityLabel='Learn more about this purple button'
          buttonClasses='lg:mt-4 mt-2 py-3'
          contentClasses='text-base'
          content='Se connecter'
          variant='text'
          color='primary'
          onPress={navigateToLogin}
          font='LatoBold'
        />
        <SimpleButton
          accessibilityLabel='Learn more about this purple button'
          buttonClasses='lg:mt-4 mt-2 py-3'
          contentClasses='text-base'
          content='Lesgo EC2'
          variant='text'
          color='primary'
          onPress={navigateToEC2}
          font='LatoBold'
        />
      </View>
    </View>
  );
};
