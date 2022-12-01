import React, { useCallback, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, TextInput, Dimensions } from 'react-native';
import { ComplexButton, SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigate } from 'react-router-native';
import { Easing } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';

export const Register = () => {
  const tailwind = useTailwind();
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [birthDate, setBirthDate] = useState<string>('');
  const [viewHeight, setViewHeight] = useState<number>(0);
  const navigateToLogin = useCallback(() => navigate('/login', { replace: true }), [navigate]);
  const navigateToHome = useCallback(() => navigate('/home', { replace: true }), [navigate]);
  console.log(mail, password, birthDate);
  const register = useCallback(() => {
    console.log('register', {
      birthDate,
      email: mail,
      password,
      passwordHidden
    });
    axios
      .post('http://localhost:7001/v1/user/register', {
        email: mail,
        birthDate,
        password
      })
      .then((res) => {
        navigateToHome();
      });
  }, [birthDate, mail, password, navigateToHome]);
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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View
      style={tailwind(
        'flex flex-col h-full items-center justify-between z-50 w-full bg-light-100'
      )}>
      <View
        style={tailwind('flex w-full justify-center items-center pb-8')}
        onLayout={(event) => setViewHeight(event.nativeEvent.layout.height)}>
        <Image
          style={tailwind('mt-2 lg:mt-10 xl:mt-16 w-[150px]')}
          resizeMode='contain'
          source={require('../../../assets/Cozette.png')}
        />
        <AppText
          style={tailwind(
            'text-xl md:text-2xl pt-1 lg:text-2.5xl font-normal text-center -mt-2 lg:mt-4 xl:mt-8'
          )}
          font='SuperiorBold'>
          Bienvenue chez Cozette, {'\n'} Lille, vue par les lillois
        </AppText>
        <View style={tailwind('mt-5 lg:mt-10 max-w-[80%] w-full flex flex-col')}>
          <View style={tailwind('w-full')}>
            <AppText style={tailwind('text-sm lg:text-base')} font='Lato'>
              Votre adresse mail
            </AppText>
            <View style={tailwind('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full')}>
              <TextInput
                style={tailwind('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={mail}
                placeholder='lillois@gmail.com'
                onChangeText={(text) => setMail(text)}
              />
            </View>
          </View>
          <View style={tailwind('w-full mt-3 md:mt-5')}>
            <AppText style={tailwind('text-sm lg:text-base')} font='Lato'>
              Votre date de naissance
            </AppText>
            <ComplexButton variant='text' onPress={() => setOpen(true)}>
              <AppText font='Lato'>Teeest</AppText>
            </ComplexButton>
            <View style={tailwind('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full')}>
              <TextInput
                style={tailwind('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={birthDate}
                placeholder='JJ/MM/AAAA'
                onChangeText={(text) => setBirthDate(text)}
              />
            </View>
          </View>
          <View style={tailwind('mt-3 md:mt-5 w-full')}>
            <AppText style={tailwind('text-sm lg:text-base')} font='Lato'>
              Votre mot de passe
            </AppText>
            <View style={tailwind('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full relative')}>
              <TextInput
                style={tailwind('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={password}
                secureTextEntry={passwordHidden}
                placeholder='Evitez azerty1234'
                onChangeText={(text) => setPassword(text)}
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
                    buttonClasses='-mt-1 lg:mt-0'
                    onPress={() => setPasswordHidden(true)}>
                    <EyeSlashIcon color='#FF9270' size={20} />
                  </ComplexButton>
                )}
              </View>
            </View>
          </View>
          <SimpleButton
            content="S'inscrire"
            variant='contained'
            color='primary'
            buttonClasses='mt-3 md:mt-5 lg:mt-10'
            contentClasses='text-sm lg:text-base p-1 lg:p-2'
            font='LatoBold'
            onPress={register}
          />
          <View style={tailwind('flex flex-row items-center justify-center')}>
            <AppText style={tailwind('text-sm lg:text-base')}>Déjà un compte ?</AppText>
            <SimpleButton
              content='Connectez-vous ici'
              variant='text'
              color='primary'
              contentClasses='text-sm lg:text-base'
              font='LatoBold'
              buttonClasses='px-1'
              onPress={navigateToLogin}
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
