import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, View } from 'react-native';

import DdayBackground from '@assets/home/ddayBackground.svg';
import LetterComponent from '@widgets/home/letterComponent';
import WriteButton from '@assets/home/write.svg';
import { HomeScreenProps } from 'src/shared/stack/stack';
import Header from '@widgets/Header';
import { useRecoilValue } from 'recoil';
import { profileStore } from '@recoil/store';
import { getLetterList } from '@app/server/home/home';

interface Letter {
  letterId: number;
  senderId: number;
  receiverId: number;
  imageUrl: string;
  body: string;
  createdAt: string;
  nickname: string;
  opened: boolean;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const profile = useRecoilValue(profileStore);
  const [letterList, setLetterList] = useState<Record<string, any[]>>({});

  const toWrite = () => {
    navigation.navigate('WriteLetterScreen');
  };

  const transformData = (data: Letter[]) => {
    return data.reduce((acc, item) => {
      const date = item.createdAt.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        letterId: item.letterId,
        senderId: item.senderId,
        receiverId: item.receiverId,
        imageUrl: item.imageUrl,
        body: item.body,
        createdAt: item.createdAt,
        nickname: item.nickname,
        opened: item.opened,
      });
      return acc;
    }, {} as Record<string, any[]>);
  };

  useEffect(() => {
    const getLetters = async () => {
      try {
        const response = await getLetterList(profile.userId);

        const transformedData = transformData(response.data);
        setLetterList(transformedData);
      } catch (error) {
        console.error('Failed to fetch letters:', error);
      }
    };
    getLetters();
  }, [profile.userId]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <ScrollView bounces={false} className="bg-white">
        <View className="bg-white flex-1">
          <View className="w-[1px] h-full absolute bg-black100 left-[65px] z-30" />

          <View className="relative">
            <View className="relative -left-[62px] z-40">
              <DdayBackground />
            </View>
          </View>

          <View className="">
            <LetterComponent navigation={navigation} letterList={letterList} />
          </View>
        </View>
      </ScrollView>

      <View className="fixed bottom-20 right-5 z-20 flex w-fit items-end">
        <Pressable onPress={toWrite}>
          <WriteButton />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
