import React, { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Svg, { Path } from 'react-native-svg';
import { useLocation, useNavigate } from 'react-router-native';
import { ChatBubbleLeftIcon, HomeIcon, MapPinIcon, UserIcon } from 'react-native-heroicons/solid';

const NavbarIcon: React.FC = () => {
  return (
    <Svg width='37' height='24' viewBox='0 0 37 24' fill='none'>
      <Path
        d='M21.3005 0H18.9756V5.93022H22.8432V19.2331H28.758V5.93022H36.5518V0H27.2153H21.3005Z'
        fill='white'
      />
      <Path d='M0 5.93022H7.79383V19.2331H13.7086V5.93022H17.7413V0H0V5.93022Z' fill='white' />
      <Path d='M13.5821 20.5182H7.71973V23.6036H13.5821V20.5182Z' fill='white' />
      <Path d='M28.6944 20.5182H22.832V23.6036H28.6944V20.5182Z' fill='white' />
    </Svg>
  );
};

export const Navbar = () => {
  const tailwind = useTailwind();
  const location = useLocation();
  const navigate = useNavigate();
  const bannedLocations = ['/', '/login', '/signup'];
  const isHome = useMemo(() => location.pathname === '/home', [location.pathname]);
  const isMap = useMemo(() => location.pathname === '/map', [location.pathname]);
  const isChat = useMemo(() => location.pathname === '/chat', [location.pathname]);
  const isProfile = useMemo(() => location.pathname === '/profile', [location.pathname]);
  const navigateToHome = useCallback(() => navigate('/home', { replace: true }), [navigate]);
  if (bannedLocations.includes(location.pathname)) return null;
  return (
    <View
      style={tailwind(
        'flex flex-row justify-between items-center w-full bg-white h-[70px] lg:h-[80px] rounded-t-3xl absolute bottom-0 z-0'
      )}>
      <View
        style={tailwind(
          'absolute h-[66px] w-[66px] top-[-33px] left-[50%] -ml-[33px] bg-gray-300 z-10 rounded-full'
        )}
      />
      <View
        style={tailwind(
          'px-[11.5px] py-[18px] bg-primary-300 rounded-full w-[56px] h-[56px] flex justify-center items-center absolute top-[-28px] left-[50%] -ml-[28px] z-20'
        )}>
        <NavbarIcon />
      </View>
      <View style={tailwind('flex flex-row items-center justify-between w-full -mt-2')}>
        <View style={tailwind('flex flex-row items-center justify-start ml-8 lg:ml-10')}>
          <Pressable onPress={navigateToHome} accessibilityLabel='HomeButton'>
            {({ pressed }) => (
              <HomeIcon
                style={tailwind(
                  `${
                    isHome || pressed ? 'text-primary-300' : 'text-primary-100'
                  } max-h-[25px] max-w-[25px] lg:max-h-[28px] lg:max-w-[28px] xl:max-h-[30px] xl:max-w-[30px]`
                )}
                size={60}
              />
            )}
          </Pressable>
          <Pressable onPress={navigateToHome} accessibilityLabel='MapButton'>
            {({ pressed }) => (
              <MapPinIcon
                style={tailwind(
                  `${
                    isMap || pressed ? 'text-primary-300' : 'text-primary-100'
                  } max-h-[25px] max-w-[25px] lg:max-h-[28px] lg:max-w-[28px] xl:max-h-[30px] xl:max-w-[30px] ml-8 lg:ml-10`
                )}
                size={60}
              />
            )}
          </Pressable>
        </View>
        <View style={tailwind('flex flex-row items-center justify-end mr-8 lg:mr-10')}>
          <Pressable onPress={navigateToHome} accessibilityLabel='HomeButton'>
            {({ pressed }) => (
              <ChatBubbleLeftIcon
                style={tailwind(
                  `${
                    isChat || pressed ? 'text-primary-300' : 'text-primary-100'
                  } max-h-[25px] max-w-[25px] lg:max-h-[28px] lg:max-w-[28px] xl:max-h-[30px] xl:max-w-[30px] mr-8 lg:mr-10`
                )}
                size={60}
              />
            )}
          </Pressable>
          <Pressable onPress={navigateToHome} accessibilityLabel='HomeButton'>
            {({ pressed }) => (
              <UserIcon
                style={tailwind(
                  `${
                    isChat || pressed ? 'text-primary-300' : 'text-primary-100'
                  } max-h-[25px] max-w-[25px] lg:max-h-[28px] lg:max-w-[28px] xl:max-h-[30px] xl:max-w-[30px]`
                )}
                size={60}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};
