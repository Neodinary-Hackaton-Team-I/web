import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import DdayBackground from '@assets/home/ddayBackground.svg';
import { HomeScreenProps } from 'src/shared/stack/stack';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const toWrite = () => {
    navigation.navigate('WriteLetterScreen');
  };

  return (
    <SafeAreaView>
      <DdayBackground />

      <Pressable onPress={toWrite}>
        <Text>쓰러가기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
