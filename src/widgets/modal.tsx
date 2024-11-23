import React from 'react';
import { PropsWithChildren } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback } from 'react-native';

interface UserItem {
  nickName: string;
  userId: number;
}

interface ItemProps {
  input: string;
  userList: UserItem[];
  onPress: (user: UserItem) => void;
}

const Container = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView className="border-2 border-gray03 rounded absolute top-14 w-full bg-white z-50 max-h-36">
      {children}
    </ScrollView>
  );
};

const Item = ({ input = '', userList, onPress }: ItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text className="p-2">
        {userList.map((char, index) => (
          <Text
            key={index}
            className={`${
              typeof input === 'string' && input.includes(char.nickName)
                ? 'text-red300'
                : 'text-gray03'
            }`}
          >
            {char.nickName}
          </Text>
        ))}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const Modal = {
  Container,
  Item,
};

export default Modal;
