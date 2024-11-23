import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'src/shared/stack/stack';

import LoginScreen from '@screens/login/login';
import SignUpScreen from '@screens/signup/signup';
import SignUpCompleteScreen from '@screens/signupComplete/signupComplete';
import WriteLetterScreen from '@screens/WriteLetterScreen/WriteLetterScreen';
import WriteLetterCompleteScreen from '@screens/WriteLetterCompleteScreen/WriteLetterCompleteScreen';

import UserSearchScreen from '@screens/userSearch/userSearch';
import FollowScreen from '@screens/follow/follow';
import { useRecoilValue } from 'recoil';
import { isLoggedInStore } from '@recoil/store';
import { RootStackParamList } from 'src/shared/stack/rootStack';
import HomeScreen from '@screens/home/home';
import ViewLetterScreen from '@screens/viewLetter/viewLetter';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const stack = createNativeStackNavigator<StackParamList>();

function AppInner() {
  const isLoggedIn = useRecoilValue(isLoggedInStore);

  return (
    <GestureHandlerRootView>
      {isLoggedIn ? (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="HomeScreen" component={HomeScreen} />
          <stack.Screen name="WriteLetterScreen" component={WriteLetterScreen} />
          <stack.Screen name="WriteLetterCompleteScreen" component={WriteLetterCompleteScreen} />
          <stack.Screen name="UserSearchScreen" component={UserSearchScreen} />
          <stack.Screen name="FollowScreen" component={FollowScreen} />
          <stack.Screen name="ViewLetterScreen" component={ViewLetterScreen} />
        </stack.Navigator>
      ) : (
        <rootStack.Navigator screenOptions={{ headerShown: false }}>
          <rootStack.Screen name="LoginScreen" component={LoginScreen} />
          <rootStack.Screen name="SignUpScreen" component={SignUpScreen} />
          <rootStack.Screen name="SignUpCompleteScreen" component={SignUpCompleteScreen} />
        </rootStack.Navigator>
      )}
    </GestureHandlerRootView>
  );
}

export default AppInner;
