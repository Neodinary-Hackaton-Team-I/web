import React from 'react';
import { getLetterData } from '@app/server/viewLetter/viewLetter';
import Header from '@widgets/Header';
import { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ViewLetterScreenProps } from 'src/shared/stack/stack';

import BackArrow from '@assets/WriteLetterScreen/backArrow.svg';

interface LetterItem {
  letterId: number;
  senderId: number;
  receiverId: number;
  imageUrl: string;
  body: string;
  createdAt: string;
  nickname: string;
  opened: boolean;
}

const ViewLetterScreen = ({ navigation, route }: ViewLetterScreenProps) => {
  const { letterId } = route.params;

  const toBack = () => {
    navigation.goBack();
  };

  const [letterData, setLetterData] = useState<LetterItem>({
    letterId: 0,
    senderId: 0,
    receiverId: 0,
    imageUrl: '',
    body: '',
    createdAt: '',
    nickname: '',
    opened: false,
  });

  useEffect(() => {
    const getLetter = async () => {
      const response = await getLetterData(letterId);

      setLetterData(response.data);
    };

    getLetter();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <Pressable onPress={toBack} className="px-[18px]">
        <BackArrow />
      </Pressable>
      <View className="px-[18px] bg-white">
        <ScrollView
          className="py-4 leading-5 flex flex-col bg-white"
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
        >
          {letterData.imageUrl ? (
            <>
              <View className="w-full items-center mb-4">
                <Image
                  source={{ uri: letterData.imageUrl }}
                  style={{ width: '100%', height: 300 }}
                />
              </View>
              <View className="border border-gray03 w-full h-[300px] px-6 py-4">
                <Text>{letterData.body}</Text>
              </View>
            </>
          ) : (
            <View className="border border-gray03 w-full h-full px-6 py-4">
              <Text>{letterData.body}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewLetterScreen;
