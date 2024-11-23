import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Pressable>
          <Text>로그인</Text>
        </Pressable>
        <Pressable>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
