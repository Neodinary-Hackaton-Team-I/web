import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import TreeImage from '@assets/login/tree.svg';

import { isLoggedInStore } from '@recoil/store';
import { useRecoilState } from 'recoil';

const SignUpCompleteScreen = () => {
  const [, setIsLoggedIn] = useRecoilState(isLoggedInStore);

  return (
    <LinearGradient
      colors={['#000000', '#381438']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 flex flex-col justify-between"
    >
      <View className="mt-[154px] space-y-[25px]">
        <Text className="text-white text-center font-semibold text-2xl">회원가입 완료</Text>
        <Text className="text-gray300 text-center font-normal text-[13px]">
          크리스마스에 열어 볼 추억을{'\n'}저장해볼까요?
        </Text>
      </View>

      <View className="flex flex-row justify-center">
        <TreeImage />
      </View>

      <View className="px-5 mb-12">
        <Pressable
          onPress={() => setIsLoggedIn(true)}
          className="rounded-[10px] py-[18.5px] bg-red100"
        >
          <Text className="text-center text-white font-semibold">메인화면으로</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default SignUpCompleteScreen;
