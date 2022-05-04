import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Text, View, SafeAreaView, Image } from 'react-native';
import { Button } from '../design/Buttons';

export const HomePage = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex flex-col h-full z-50')}>
			<View style={tailwind('flex h-1/2 items-center bg-red-300')}>
			</View>
			<View style={tailwind('flex items-center')}>
				<Image
					style={tailwind('w-full max-w-[200px]')}
					resizeMode="contain"
					source={require('../assets/Cozette.png')}
				/>
				<View style={tailwind('-mt-[10px] p-0')}>
					<Text style={tailwind('text-xl font-semibold text-center')}>
						Bienvenue chez Cozette, {"\n"} les amoureux de Lille.
					</Text>
				</View>
				<Button
					onPress={() => console.log('wesh')}
					accessibilityLabel="Learn more about this purple button"
					buttonClasses=""
					contentClasses=""
					content="wesh alors"
					variant="contained"
					color="primary"
				/>
			</View>
	</View>
  );
};