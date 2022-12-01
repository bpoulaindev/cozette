import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Image, ScrollView, TextInput, Pressable } from 'react-native';
import { SimpleButton } from '../../design/Buttons';
import { AppText } from '../../design/Text';
import { MapPinIcon, StarIcon, ArrowDownTrayIcon } from 'react-native-heroicons/solid';
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import axios from 'axios';
import { ImagePickerResult } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [fileName, setFileName] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [fileBuffer, setFileBuffer] = useState<Blob>();
  const [fileType, setFileType] = useState<string>('');

  // Replace REGION with the appropriate AWS Region, such as 'us-east-1'.
  const region = 'eu-west-3';
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: 'AKIAZCFFD2IVEPK2RUVR',
      secretAccessKey: 'jezQAiSladAAvrizOnhVmyPGQCE0DbIDhkzuGspX'
    }
    /*credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region }),
      // Replace IDENTITY_POOL_ID with an appropriate Amazon Cognito Identity Pool ID for, such as 'us-east-1:xxxxxx-xxx-4103-9936-b52exxxxfd6'.
      identityPoolId: 'us-east-1:34987c2b-0f76-4347-a742-d4b3bfae065d'
    }) */
  });
  const [listBucketFiles, setListBucketFiles] = useState<unknown[]>([]);
  const putBucketObject = async () => {
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await client.send(
        new PutObjectCommand({
          Body: `${fileBuffer || fileName}.${fileType}`,
          Bucket: 'mds-cloudcomputing',
          Key: fileName
        })
      );
      setSuccessMsg(`File has been sent.`);
      setFileName('');
    } catch (e: any) {
      setErrorMsg(e);
    }
  };
  const listBucket = async () => {
    try {
      const listBucket = await client.send(
        new ListObjectsCommand({ Bucket: 'mds-cloudcomputing' })
      );
      setSuccessMsg(
        `Number of files: ${listBucket.Contents?.length ? listBucket.Contents.length - 1 : 0}`
      );
      setListBucketFiles(listBucket.Contents ?? []);
      console.log(listBucket);
    } catch (e: any) {
      setErrorMsg(e);
    }
  };
  const getBucketObject = async (key: string) => {
    try {
      const data = await client.send(
        new GetObjectCommand({
          Bucket: 'mds-cloudcomputing',
          Key: key
        })
      );
      // const stream = await data.Body.transformToString();
      console.log('test2', data);
      // console.log(response);
      // const file = await fetch(response);
      // console.log('object', object);
    } catch (e: any) {
      setErrorMsg(e);
    }
  };
  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    await uploadPicture(result);
  };
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
    console.log(result);
    await uploadPicture(result);
  };
  const uploadPicture = async (result: ImagePickerResult) => {
    if (!result.cancelled && result.assets) {
      const picture = await axios.get(result.assets[0].uri);
      setFileBuffer(picture.data);
      setFileType(picture.data.type);
      console.log(result.assets[0].uri);
    }
  };
  const downloadFile = async (uri: string) => {
    FileSystem.downloadAsync('uri', FileSystem.documentDirectory + 'small.mp4')
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <View style={tailwind('flex w-full my-4')}>
            <AppText style={{ color: 'green' }}>
              {successMsg ? `Success: ${successMsg}` : ``}
            </AppText>
            <AppText style={{ color: 'red' }}>{errorMsg ? `Error: ${errorMsg}` : ``}</AppText>
            <View>
              <View style={tailwind('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full')}>
                <TextInput
                  style={tailwind(
                    'py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5'
                  )}
                  onChangeText={(text) => setFileName(text)}
                  autoCapitalize={'none'}
                  value={fileName}
                  placeholder={'Enter File Name'}
                />
              </View>
              <SimpleButton
                buttonClasses='mt-2'
                variant='contained'
                color='primary'
                content='Put Bucket object'
                onPress={putBucketObject}
              />
              <SimpleButton
                buttonClasses='mt-2'
                variant='contained'
                color='light'
                content='List Bucket objects'
                onPress={listBucket}
              />
              <SimpleButton
                buttonClasses='mt-2'
                variant='contained'
                color='light'
                content='File input'
                onPress={pickDocument}
              />
              <SimpleButton
                buttonClasses='mt-2'
                variant='contained'
                color='light'
                content='Camera'
                onPress={openCamera}
              />
              {listBucketFiles.length > 0 && (
                <AppText style={tailwind('text-base font-normal my-2')} font='LatoBold'>
                  Results:
                </AppText>
              )}
              {listBucketFiles.map((file: any, index) => (
                <View
                  style={tailwind(
                    `flex flex-row justify-between items-center w-full mt-2 pb-1 ${
                      index !== listBucketFiles.length && 'border-b-[.5px] border-gray-200'
                    }`
                  )}
                  key={index}>
                  <AppText style={tailwind('flex max-w-[70%]')}>{file.Key}</AppText>
                  <Pressable
                    accessibilityLabel='HomeButton'
                    onPress={() => getBucketObject(file.Key)}>
                    {({ pressed }) => (
                      <ArrowDownTrayIcon
                        style={tailwind(
                          `${
                            pressed ? 'text-primary-300' : 'text-primary-100'
                          } max-h-[25px] max-w-[25px] lg:max-h-[28px] lg:max-w-[28px] xl:max-h-[30px] xl:max-w-[30px]`
                        )}
                      />
                    )}
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
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
