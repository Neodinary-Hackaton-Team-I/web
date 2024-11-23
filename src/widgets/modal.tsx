import { PropsWithChildren } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback } from 'react-native';

interface ItemProps {
  input: string;
  value: string;
  onPress: () => void;
}

const Container = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView className="border-2 border-gray03 rounded absolute top-14 w-full bg-white z-50 max-h-36">
      {children}
    </ScrollView>
  );
};

const Item = ({ input, value, onPress }: ItemProps) => {
  const character = value.split('');

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text className="p-2">
        {character.map((char, index) => (
          <Text key={index} className={`${input.includes(char) ? 'text-red300' : 'text-gray03'}`}>
            {char}
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
