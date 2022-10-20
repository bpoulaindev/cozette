import React, { useCallback, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, ImageBackground, TextInput } from 'react-native';
import { ComplexButton, SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigate } from 'react-router-native';

export const Home = () => {
  const tailwind = useTailwind();
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const navigateToLogin = useCallback(() => navigate('/login', { replace: true }), [navigate]);
  const capsWidth = 70;
  return (
    <View style={tailwind('flex flex-col h-full items-center z-50 w-full bg-light-100')}>
      <View
        style={[
          tailwind('bg-white w-full flex justify-center items-center'),
          { 'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }
        ]}>
        <Image
          style={tailwind('mt-16 w-[150px]')}
          resizeMode='contain'
          source={require('../../../assets/Cozette.png')}
        />
        <AppText style={tailwind('text-3xl font-normal text-center mt-6')} font='SuperiorBold'>
          Bonjour, John
        </AppText>
        <View style={tailwind('flex flex-col w-[75%] items-start mt-4')}>
          <AppText style={tailwind('text-xl font-normal text-center')} font='Superior'>
            {"Tes cap's"}
          </AppText>
          <View style={tailwind('w-full rounded-full bg-primary-100 mt-1')}>
            <View
              style={[
                tailwind('w-auto h-[10px] rounded-full bg-primary-300'),
                { width: `${capsWidth}%` }
              ]}
            />
          </View>
          <View style={tailwind('flex flex-row justify-between w-full mb-3')}>
            <AppText style={tailwind('text-sm font-normal mt-1/2 text-gray-300')} font='Lato'>
              0
            </AppText>
            <AppText style={tailwind('text-sm font-normal mt-1/2 text-gray-300')} font='Lato'>
              120 capsules
            </AppText>
          </View>
        </View>
      </View>
      <View style={tailwind('mt-10 max-w-[75%] w-full flex flex-col')}>
        <View style={tailwind('flex flex-row w-full justify-between items-center')}>
          <AppText style={tailwind('text-.5xl')} font='Superior'>
            Les nouveaux lieux
          </AppText>
          <SimpleButton
            content='Voir tout'
            variant='text'
            color='primary'
            contentClasses='text-base'
            font='LatoBold'
            buttonClasses='px-1'
          />
        </View>
        <View style={tailwind('w-full mt-5')}>
          <AppText style={tailwind('text-base')} font='Lato'>
            Votre date de naissance
          </AppText>
          <View style={tailwind('w-full rounded-md mt-2 bg-white w-full')}>
            <TextInput
              style={tailwind('py-4 px-6 text-base leading-5')}
              value={mail}
              placeholder='JJ/MM/AAAA'
              onChange={(e: any) => setMail(e.target.value)}
            />
          </View>
        </View>
        <View style={tailwind('mt-5 w-full')}>
          <AppText style={tailwind('text-base font-bold')} font='Lato'>
            Votre mot de passe
          </AppText>
          <View style={tailwind('block w-full rounded-md mt-2 bg-white w-full relative')}>
            <TextInput
              style={tailwind('py-4 px-6 text-base leading-5')}
              value={password}
              secureTextEntry={passwordHidden}
              placeholder='Evitez azerty1234'
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <View
              style={tailwind(
                'pointer-events-none absolute inset-y-2.5 right-0 flex items-center pr-3'
              )}>
              {passwordHidden ? (
                <ComplexButton variant='text' onPress={() => setPasswordHidden(false)}>
                  <EyeIcon color='#FF9270' size={20} />
                </ComplexButton>
              ) : (
                <ComplexButton variant='text' onPress={() => setPasswordHidden(true)}>
                  <EyeSlashIcon color='#FF9270' size={20} />
                </ComplexButton>
              )}
            </View>
          </View>
        </View>
        <SimpleButton
          content='Se connecter'
          variant='contained'
          color='primary'
          buttonClasses='mt-10'
          contentClasses='text-base p-2'
          font='LatoBold'
        />
        <View style={tailwind('flex flex-row items-center justify-center')}>
          <AppText style={tailwind('text-base')}>Déjà un compte ?</AppText>
          <SimpleButton
            content='Connectez-vous ici'
            variant='text'
            color='primary'
            contentClasses='text-base'
            font='LatoBold'
            buttonClasses='px-1'
            onPress={navigateToLogin}
          />
        </View>
      </View>
      <ImageBackground
        style={tailwind('w-full h-[300px]')}
        resizeMode='center'
        source={require('../../../assets/arnaque2.png')}
      />
    </View>
  );
};
