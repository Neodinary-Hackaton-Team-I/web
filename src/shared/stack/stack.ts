import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  // 첫 화면
  LoginScreen: undefined;
  // 회원가입 스크린
  SignUpScreen: undefined;
  // 회원가입 완료 스크린
  SignUpCompleteScreen: undefined;

  // 메인 스크린
  HomeScreen: undefined;

  // 팔로우 & 팔로잉 스크린
  FollowScreen: undefined;
  // 유저 검색 스크린
  UserSearchScreen: undefined;

  // 편지 작성 스크린
  WriteLetterScreen: undefined;
  // 편지 작성 완료 스크린
  WriteLetterCompleteScreen: { receiver: string };
};

export type LoginScreenProps = NativeStackScreenProps<StackParamList, 'LoginScreen'>;

export type SignUpScreenProps = NativeStackScreenProps<StackParamList, 'SignUpScreen'>;
export type SignUpCompleteScreenProps = NativeStackScreenProps<
  StackParamList,
  'SignUpCompleteScreen'
>;
export type HomeScreenProps = NativeStackScreenProps<StackParamList, 'HomeScreen'>;
export type FollowScreenProps = NativeStackScreenProps<StackParamList, 'FollowScreen'>;
export type UserSearchScreenProps = NativeStackScreenProps<StackParamList, 'UserSearchScreen'>;

//
export type WriteLetterScreenProps = NativeStackScreenProps<StackParamList, 'WriteLetterScreen'>;
export type WriteLetterCompleteScreenProps = NativeStackScreenProps<
  StackParamList,
  'WriteLetterCompleteScreen'
>;
