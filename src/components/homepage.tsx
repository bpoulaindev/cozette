import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Text, View, SafeAreaView} from 'react-native';

export const HomePage = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind('h-full')}>
			<View style={tailwind('pt-12 items-center')}>
				<View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
					<Text style={tailwind('text-blue-800 font-semibold')}>
						Vina Punta Cana
					</Text>
				</View>
			</View>
		</SafeAreaView>
  );
};