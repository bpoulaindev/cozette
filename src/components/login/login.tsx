import React, { useCallback, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, TextInput } from 'react-native';
import { ComplexButton, SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigate } from 'react-router-native';
import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

export const Login = () => {
  const tailwind = useTailwind();
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const navigateToRegister = useCallback(
    () => navigate('/register', { replace: true }),
    [navigate]
  );
  const navigateToHome = useCallback(() => navigate('/home', { replace: true }), [navigate]);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const carouselHeight = windowHeight - viewHeight;
  const sliders = [
    require('../../../assets/slider1.png'),
    require('../../../assets/slider2.png'),
    require('../../../assets/slider3.png'),
    require('../../../assets/slider1.png'),
    require('../../../assets/slider2.png'),
    require('../../../assets/slider3.png')
  ];
  return (
    <View
      style={tailwind(
        'flex flex-col h-full items-center z-50 w-full bg-light-100 justify-between'
      )}>
      <View
        style={tailwind('w-full flex justify-center items-center pb-8')}
        onLayout={(event) => setViewHeight(event.nativeEvent.layout.height)}>
        <Image
          style={tailwind('mt-10 lg:mt-16 w-[150px]')}
          resizeMode='contain'
          source={require('../../../assets/Cozette.png')}
        />
        <AppText
          style={tailwind('text-2xl lg:text-3xl font-normal text-center mt-5 lg:mt-10')}
          font='SuperiorBold'>
          Prêt à découvrir Lille ?
        </AppText>
        <View style={tailwind('mt-10 lg:mt-16 max-w-[80%] w-full flex flex-col')}>
          <View style={tailwind('w-full')}>
            <AppText style={tailwind('text-sm lg:text-base')} font='Lato'>
              Votre adresse mail
            </AppText>
            <View style={tailwind('w-full rounded-md mt-2 bg-white w-full')}>
              <TextInput
                style={tailwind('py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={mail}
                placeholder='lillois@gmail.com'
                placeholderTextColor='#D0CFD9'
                onChange={(e: any) => setMail(e.target.value)}
              />
            </View>
          </View>
          <View style={tailwind('mt-5 lg:mt-10 w-full')}>
            <AppText style={tailwind('text-sm lg:text-base')} font='Lato'>
              Votre mot de passe
            </AppText>
            <View style={tailwind('w-full rounded-md mt-2 bg-white w-full relative')}>
              <TextInput
                style={tailwind('py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={password}
                secureTextEntry={passwordHidden}
                placeholder='Evitez azerty1234'
                placeholderTextColor='#D0CFD9'
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <View
                style={tailwind(
                  'pointer-events-none absolute inset-y-1.5 lg:inset-y-2.5 right-0 flex items-center pr-1.5 lg:pr-3'
                )}>
                {passwordHidden ? (
                  <ComplexButton
                    variant='text'
                    buttonClasses='-mt-1 lg:mt-0'
                    onPress={() => setPasswordHidden(false)}>
                    <EyeIcon color='#FF9270' size={20} />
                  </ComplexButton>
                ) : (
                  <ComplexButton
                    variant='text'
                    buttonClasses='lg:-mt-1'
                    onPress={() => setPasswordHidden(true)}>
                    <EyeSlashIcon color='#FF9270' size={20} />
                  </ComplexButton>
                )}
              </View>
            </View>
          </View>
          <View style={tailwind('w-full flex justify-end items-end')}>
            <SimpleButton
              variant='text'
              contentClasses='text-primary-300 text-sm lg:text-base'
              buttonPressedClasses='bg-primary-300'
              contentPressedClasses='text-white'
              content='Mot de passe oublié ?'
              font='LatoBold'
            />
          </View>
          <SimpleButton
            content='Se connecter'
            variant='contained'
            color='primary'
            buttonClasses='mt-5 lg:mt-10'
            contentClasses='text-sm lg:text-base p-1 lg:p-2'
            font='LatoBold'
            onPress={navigateToHome}
          />
          <View style={tailwind('flex items-center justify-center')}>
            <AppText style={tailwind('text-sm lg:text-base')}>Pas encore de compte ?</AppText>
            <SimpleButton
              content='Inscrivez-vous ici'
              variant='text'
              color='primary'
              contentClasses='text-sm lg:text-base'
              font='LatoBold'
              buttonClasses='px-1'
              onPress={navigateToRegister}
            />
          </View>
        </View>
      </View>
      <Carousel
        loop
        width={windowWidth / 3}
        style={{ width: windowWidth, marginTop: carouselHeight - 180 }}
        height={carouselHeight}
        autoPlay={true}
        data={sliders}
        scrollAnimationDuration={100}
        withAnimation={{
          type: 'timing',
          config: {
            duration: 10000,
            easing: Easing.linear
          }
        }}
        renderItem={({ index }) => (
          <Image
            style={[
              tailwind(' flex-1 p-0 m-0 rounded-t-lg'),
              {
                padding: 0,
                maxHeight: 180,
                width: windowWidth / 3 - 5,
                maxWidth: windowWidth / 3 - 5,
                margin: 0
              }
            ]}
            source={sliders[index]}
          />
        )}
      />
    </View>
  );
};
