import React from 'react';
import { Pressable, SafeAreaView, ScrollView, View } from 'react-native';

import DdayBackground from '@assets/home/ddayBackground.svg';
import LetterComponent from '@widgets/home/letterComponent';
import WriteButton from '@assets/home/write.svg';
import { HomeScreenProps } from 'src/shared/stack/stack';
import Header from '@widgets/Header';

const dummyData = {
  '2024-11-01': [
    {
      letterId: 101,
      date: '2024-11-01',
      writer: 'Alice',
      isOpened: true,
    },
    {
      letterId: 102,
      date: '2024-11-02',
      writer: 'Bob',
      isOpened: false,
    },
  ],
  '2024-11-03': [
    {
      letterId: 201,
      date: '2024-11-03',
      writer: 'Charlie',
      isOpened: true,
    },
    {
      letterId: 202,
      date: '2024-11-04',
      writer: 'Dave',
      isOpened: false,
    },
  ],
  '2024-11-05': [
    {
      letterId: 301,
      date: '2024-11-05',
      writer: 'Eve',
      isOpened: true,
    },
  ],
  '2024-10-30': [
    {
      letterId: 401,
      date: '2024-10-30',
      writer: 'Frank',
      isOpened: false,
    },
    {
      letterId: 402,
      date: '2024-10-29',
      writer: 'Grace',
      isOpened: true,
    },
  ],
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const toWrite = () => {
    navigation.navigate('WriteLetterScreen');
  };

  return (
    <SafeAreaView className="bg-white">
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <ScrollView bounces={false}>
        <View className="bg-white">
          <View className="w-[1px] h-full absolute bg-black100 left-[65px] z-30" />

          <View className="relative">
            <View className="relative -left-[62px] z-40">
              <DdayBackground />
            </View>
          </View>

          <View className="">
            <LetterComponent letterList={dummyData} />
          </View>
        </View>
      </ScrollView>

      <View className="fixed bottom-28 right-5 z-20 flex w-fit items-end">
        <Pressable onPress={toWrite}>
          <WriteButton />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
