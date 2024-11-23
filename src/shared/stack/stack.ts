import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  LoginScreen: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<StackParamList, 'LoginScreen'>;
