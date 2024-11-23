import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  // 첫 화면
  LoginScreen: undefined;
  // 회원가입 스크린
  SignUpScreen: undefined;
  // 회원가입 완료 스크린
  SignUpCompleteScreen: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;
export type SignUpCompleteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpCompleteScreen'
>;
