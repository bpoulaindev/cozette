import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, ScrollView } from 'react-native';
import { SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { MapPinIcon, StarIcon } from 'react-native-heroicons/solid';

export const Home = () => {
  const tailwind = useTailwind();
  const capsWidth = 70;
  const pictures = ['A', 'B', 'C', 'D', 'E'] as string[];
  const events = [
    {
      title: 'Visite guidée de Lille',
      location: 'Lille',
      ratings: {
        average: 4.5,
        count: 27
      }
    },
    {
      title: 'Fête de la peinture',
      location: 'Zénith de Lille',
      ratings: {
        average: 4.8,
        count: 20
      }
    },
    {
      title: 'La Grand Place',
      location: 'Lille',
      ratings: {
        average: 4.7,
        count: 19
      }
    }
  ];
  return (
    <ScrollView
      style={tailwind(' w-full h-auto')}
      alwaysBounceHorizontal={false}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      <View
        style={tailwind(
          'flex flex-col h-full items-center z-50 w-full bg-light-100 pb-[133px] min-h-full'
        )}>
        <View
          style={[
            tailwind('bg-white w-full flex justify-center items-center'),
            { 'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }
          ]}>
          <Image
            style={tailwind('mt-2 lg:mt-10 xl:mt-16 w-[150px]')}
            resizeMode='contain'
            source={require('../../../assets/Cozette.png')}
          />
          <AppText style={tailwind('text-3xl font-normal text-center xl:mt-2')} font='SuperiorBold'>
            Bonjour, John
          </AppText>
          <View style={tailwind('flex flex-col w-[85%] items-start mt-4')}>
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
        <View style={tailwind('mt-4 lg:mt-8 max-w-[85%] w-full flex flex-col')}>
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
        </View>
        <View style={tailwind('mt-2 lg:mt-4 ml-[15%] w-full flex flex-col')}>
          <ScrollView
            style={tailwind('flex flex-row h-auto')}
            alwaysBounceVertical={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled>
            <View style={tailwind('flex flex-row w-full')}>
              {pictures.map((picture) => (
                <View
                  style={tailwind(
                    'w-[70px] h-[70px] lg:w-[80px] lg:h-[80px] mr-4 flex justify-center items-center rounded-full bg-primary-100'
                  )}
                  key={picture}>
                  <AppText style={tailwind('text-2xl text-center text-white')} font='SuperiorBold'>
                    {picture}
                  </AppText>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={tailwind('mt-8 lg:mt-12 w-full flex flex-col')}>
          <AppText style={tailwind('text-.5xl max-w-[85%] mx-[7.5%]')} font='Superior'>
            Le parcours de la semaine
          </AppText>
          <View style={tailwind('mt-24 w-full flex flex-col bg-primary-100')}>
            <View
              style={tailwind(
                'flex flex-col w-full -mt-20 mb-8 max-w-[85%] mx-[7.5%] rounded-lg bg-white'
              )}>
              <View style={tailwind('h-[150px] lg:h-[200px] w-full rounded-t-lg bg-gray-300')} />
              <View style={tailwind('flex flex-row w-full justify-evenly my-2')}>
                <View style={tailwind('text-center p-1/2 xl:p-1 bg-primary-300 rounded-lg')}>
                  <AppText
                    style={tailwind('text-base text-center text-white px-2 lg:px-3')}
                    font='Lato'>
                    Végan
                  </AppText>
                </View>
                <View style={tailwind('text-center p-1/2 xl:p-1 bg-primary-300 rounded-lg')}>
                  <AppText
                    style={tailwind('text-base text-center text-white px-2 lg:px-3')}
                    font='Lato'>
                    Economique
                  </AppText>
                </View>
                <View style={tailwind('text-center p-1/2 xl:p-1 bg-primary-300 rounded-lg')}>
                  <AppText
                    style={tailwind('text-base text-center text-white px-2 lg:px-3')}
                    font='Lato'>
                    Healthy
                  </AppText>
                </View>
              </View>
            </View>
          </View>
          <View style={tailwind('mt-4 lg:mt-8 w-full flex flex-col max-w-[85%] mx-[7.5%]')}>
            <View style={tailwind('flex flex-row w-full justify-between items-center')}>
              <AppText style={tailwind('text-.5xl')} font='Superior'>
                Les évènements
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
            {events.map((event, index) => (
              <View
                style={tailwind('flex flex-row w-full mt-4 justify-start')}
                key={`event_${index}`}>
                <View
                  style={tailwind(
                    'w-[70px] h-[70px] lg:w-[80px] lg:h-[80px] mr-2 bg-gray-300 rounded-lg'
                  )}
                />
                <View style={tailwind('flex flex-col')}>
                  <AppText style={tailwind('text-lg')} font='Lato'>
                    {event.title}
                  </AppText>
                  <View style={tailwind('flex flex-row items-center')}>
                    <MapPinIcon
                      style={tailwind('text-gray-400 mr-1/2 max-h-[20px] max-w-[20px]')}
                    />
                    <AppText style={tailwind('text-sm text-gray-500')} font='Lato'>
                      {event.location}
                    </AppText>
                  </View>
                  <View style={tailwind('flex flex-row items-center')}>
                    <StarIcon
                      style={tailwind('text-primary-200 mr-1/2 max-h-[20px] max-w-[20px]')}
                    />
                    <AppText style={tailwind('text-sm text-gray-500')} font='Lato'>
                      {`${event.ratings.average} (${event.ratings.count} avis)`}
                    </AppText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
