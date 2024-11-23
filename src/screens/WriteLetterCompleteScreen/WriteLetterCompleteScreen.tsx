import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import TreeImage from '@assets/login/tree.svg';
import { WriteLetterCompleteScreenProps } from 'src/shared/stack/stack';

const WriteLetterCompleteScreen = ({ navigation, route }: WriteLetterCompleteScreenProps) => {
  const { receiver } = route.params;
  return (
    <LinearGradient
      colors={['#000000', '#381438']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 flex flex-col justify-between"
    >
      <View className="mt-[154px] space-y-[25px]">
        <Text className="text-white text-center font-semibold text-2xl">전송 완료 !</Text>
        <Text className="text-gray03 text-center font-normal text-[13px]">
          {receiver}님께{'\n'}편지가 전달되었어요.
        </Text>
      </View>

      <View className="flex flex-row justify-center">
        <TreeImage />
      </View>

      <View className="px-5 mb-12">
        <Pressable
          className="rounded-[10px] py-[18.5px] bg-red100"
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text className="text-center text-white font-semibold">확인</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default WriteLetterCompleteScreen;
