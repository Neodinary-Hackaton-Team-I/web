import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, TextInput, Dimensions } from 'react-native';

import MainIcon from '@assets/login/icon.svg';
import LinearGradient from 'react-native-linear-gradient';
import { LoginScreenProps } from 'src/shared/stack/stack';

import BackGround from '@assets/login/background.svg';
import Santa from '@assets/login/santa.svg';
import { useRecoilState } from 'recoil';
import { isLoggedInStore, profileStore } from '@recoil/store';
import { login } from '@app/server/login/login';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const [, setIsLoggedIn] = useRecoilState(isLoggedInStore);
  const [, setProfile] = useRecoilState(profileStore);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailRegex, setIsEmailRegex] = useState<boolean>(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  useEffect(() => {
    if (email.trim() === '') {
      // 빈 문자열일 경우 초기 상태 유지
      setIsEmailRegex(true);
    } else {
      // 유효성 검사
      setIsEmailRegex(emailRegex.test(email));
    }
  }, [email]);

  const handleLogin = async () => {
    try {
      const response = await login({
        email: email,
        password: password,
      });
      console.log(response);

      setProfile({
        userId: response.data.userId,
        nickname: response.data.nickname,
      });

      setIsLoggedIn(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#381438']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="absolute top-0 left-0">
        <BackGround width={width} height={height} />
      </View>

      <View className="relative px-5">
        <View className="mt-[140px] flex flex-row justify-center">
          <MainIcon />
        </View>

        <View className="space-y-[51px] mt-10">
          <View className="">
            <TextInput
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="이메일을 입력해주세요"
              className="bg-white py-[19px] px-5 rounded-[10px] mb-2"
            />
            {!isEmailRegex && email.trim() !== '' && (
              <Text className="text-gray03 px-5">올바른 이메일 형식이 아닙니다.</Text>
            )}
            <TextInput
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={true}
              className="bg-white py-[19px] px-5 rounded-[10px] mt-2"
            />
          </View>

          <View className="space-y-[14px]">
            <Pressable onPress={handleLogin} className="bg-red100 py-[18.5px] rounded-[10px]">
              <Text className="text-center text-white font-semibold">로그인</Text>
            </Pressable>
            <Pressable onPress={toSignUp}>
              <Text className="underline text-gray04 text-sm font-normal text-center">
                회원가입
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="absolute bottom-10 -right-10">
        <Santa />
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
