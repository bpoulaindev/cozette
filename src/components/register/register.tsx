import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { Text, View, SafeAreaView, Image, ImageBackground, TextInput } from 'react-native';
import { ComplexButton, SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';

export const Register = () => {
  const tailwind = useTailwind();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  return (
    <View style={tailwind('flex flex-col h-full items-center z-50 w-full bg-slate-100')}>
      <Image
        style={tailwind('mt-16 w-[150px]')}
        resizeMode='contain'
        source={require('../../../assets/Cozette.png')}
      />
      <AppText style={tailwind('text-3xl font-normal text-center mt-8')} font='SuperiorBold'>
        Bienvenue chez Cozette, {'\n'} Lille, vue par les lillois
      </AppText>
      <View style={tailwind('mt-10 max-w-[75%] w-full flex flex-col')}>
        <View style={tailwind('w-full')}>
          <AppText style={tailwind('text-base')} font='Lato'>
            Votre adresse mail
          </AppText>
          <View style={tailwind('block w-full rounded-md mt-2 bg-white w-full')}>
            <TextInput
              style={tailwind('py-4 px-6 text-base leading-5')}
              value={mail}
              placeholder='lillois@gmail.com'
              onChange={(e: any) => setMail(e.target.value)}
            />
          </View>
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
          <AppText style={tailwind('text-base')}>Pas encore de compte ?</AppText>
          <SimpleButton
            content='Inscrivez-vous ici'
            variant='text'
            color='primary'
            contentClasses='text-base'
            font='LatoBold'
            buttonClasses='px-1'
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
