import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'src/shared/stack/stack';

import LoginScreen from '@screens/login';
import WriteLetterScreen from '@screens/WriteLetterScreen/WriteLetterScreen';

const stack = createNativeStackNavigator<StackParamList>();

function AppInner() {
  return (
    <GestureHandlerRootView>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="WriteLetterScreen" component={WriteLetterScreen} />

        <stack.Screen name="LoginScreen" component={LoginScreen} />
      </stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default AppInner;
