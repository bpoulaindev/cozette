import { useTailwind } from 'tailwind-rn';
import { AppText } from '../../design/Text';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EC2Client, DescribeInstancesCommand, RunInstancesCommand } from '@aws-sdk/client-ec2';
import { ACCESS_KEY_ID, REGION, SECRET_ACCESS_KEY } from '@env';
import { SimpleButton } from '../../design/Buttons';
export const Ec2 = () => {
  const tailwind = useTailwind();
  const client = new EC2Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
    }
  });
  interface Instance {
    id: string;
    type: string;
    keyName: string;
  }
  const [instances, setInstances] = useState<Instance[]>([]);
  const [instancesLength, setInstancesLength] = useState<number | null>(null);
  const listInstances = async () => {
    //id, type et keyname
    setInstances([]);
    setInstancesLength(null);
    const runningInstances = await client.send(new DescribeInstancesCommand({}));
    runningInstances?.Reservations?.map((reservation) => {
      reservation.Instances?.map((instance) => {
        console.log('passé ici');
        setInstances([
          ...instances,
          {
            id: instance.InstanceId || '',
            type: instance.InstanceType || '',
            keyName: instance.KeyName || ''
          }
        ]);
      });
    });
    setInstancesLength(instances.length || null);
  };

  const runInstances = async () => {
    await client.send(
      new RunInstancesCommand({
        ImageId: 'ami-0c2b8ca1dad447f8a',
        InstanceType: 't2.micro',
        KeyName: 'mds',
        MaxCount: 1,
        MinCount: 1
      })
    );
  };
  console.log('eho', instances);
  return (
    <ScrollView
      style={tailwind(' w-full h-auto')}
      alwaysBounceHorizontal={false}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      <View style={tailwind('flex flex-col h-full items-center z-50 w-full')}>
        <AppText
          style={tailwind('text-3xl font-normal text-center mt-10 pt-10')}
          font='SuperiorBold'>
          Bienvenue sur EC2
        </AppText>
        <View style={tailwind('flex flex-row items-center justify-center px-2 mt-10 w-full')}>
          <SimpleButton
            accessibilityLabel='Learn more about this purple button'
            buttonClasses='lg:mt-4 mt-2 py-3'
            contentClasses='text-base'
            content='List instances'
            variant='contained'
            color='primary'
            onPress={listInstances}
            font='LatoBold'
          />
          <SimpleButton
            accessibilityLabel='Learn more about this purple button'
            buttonClasses='lg:mt-4 mt-2 py-3 ml-2'
            contentClasses='text-base'
            content='Create instance'
            variant='contained'
            color='primary'
            onPress={runInstances}
            font='LatoBold'
          />
        </View>
        <View style={tailwind('flex flex-col items-center mx-2 mt-10 w-full px-8')}>
          {instancesLength && (
            <View style={tailwind('flex flex-col items-center justify-center w-full')}>
              <AppText
                style={tailwind('text-xl font-normal text-left mt-10 pt-10 w-full')}
                font='Lato'>
                There are {instancesLength} instances running
              </AppText>
              {instances.map((instance, index) => (
                <View
                  style={tailwind(
                    `flex flex-col items-center justify-start w-full ${
                      index === instancesLength ? '' : 'border-b-[.5px] border-gray-200 pb-2'
                    }`
                  )}
                  key={index}>
                  <AppText style={tailwind('text-sm font-normal text-left mt-2 w-full')}>
                    ID : {instance.id}
                  </AppText>
                  <AppText style={tailwind('text-sm font-normal text-left mt-1 w-full')}>
                    KeyName : {instance.keyName}
                  </AppText>
                  <AppText style={tailwind('text-sm font-normal text-left mt-1 w-full')}>
                    Type : {instance.type}
                  </AppText>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
