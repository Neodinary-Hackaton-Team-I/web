import React, { useState } from 'react';
import { Dimensions, Pressable, Text, TextInput, View } from 'react-native';

import MainIcon from '@assets/login/icon.svg';
import BackGround from '@assets/signup/background.svg';

import LinearGradient from 'react-native-linear-gradient';
import { SignUpScreenProps } from 'src/shared/stack/stack';
import { signUp } from '@app/server/login/login';
import { useRecoilState } from 'recoil';
import { profileStore } from '@recoil/store';

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const [, setProfile] = useRecoilState(profileStore);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isComplete = email !== '' && emailRegex.test(email) && password !== '' && nickname !== '';

  const toBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async (): Promise<void> => {
    const response = await signUp({
      email: email,
      password: password,
      nickname: nickname,
    });

    setProfile({
      userId: response.data.userId,
      nickname: nickname,
    });

    navigation.navigate('SignUpCompleteScreen');
  };

  return (
    <LinearGradient
      colors={['#000000', '#381438']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 flex flex-col justify-between"
    >
      <View className="absolute top-0 left-0">
        <BackGround width={width} height={height} />
      </View>

      <View className="px-5">
        <View className="mt-[140px] flex flex-row justify-center">
          <MainIcon />
        </View>

        <View className="mt-10">
          <View className="space-y-[29px]">
            <TextInput
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="이메일을 입력해주세요"
              className="bg-white py-[19px] px-5 rounded-[10px]"
            />
            <TextInput
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={true}
              className="bg-white py-[19px] px-5 rounded-[10px]"
            />
            <TextInput
              value={nickname}
              onChangeText={(text: string) => setNickname(text)}
              placeholder="닉네임을 입력하세요"
              className="bg-white py-[19px] px-5 rounded-[10px]"
            />
          </View>
        </View>
      </View>

      <View className="px-5 mb-12">
        <Pressable
          onPress={isComplete ? handleSignUp : toBack}
          className={`rounded-[10px] py-[18.5px] ${isComplete ? 'bg-red100' : 'bg-gray300'}`}
        >
          <Text className="text-center text-white font-semibold">
            {isComplete ? '다음' : '이전'}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;
