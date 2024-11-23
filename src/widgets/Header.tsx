import UserIcon from '@assets/Header/user.svg';
import SearchIcon from '@assets/Header/search.svg';
import Logo from '@assets/Header/logo.svg';
import { Pressable, View } from 'react-native';

interface HeaderProps {
  pressFunc1: () => void;
  pressFunc2: () => void;
}

const Header: React.FC<HeaderProps> = ({ pressFunc1, pressFunc2 }) => {
  return (
    <View className="w-full h-[40px flex flex-row justify-between items-center px-[18px]">
      <View>
        <Logo></Logo>
      </View>
      <View className="flex flex-row w-[62px] h-full items-center gap-3">
        <Pressable onPress={pressFunc1}>
          <UserIcon></UserIcon>
        </Pressable>
        <Pressable>
          <SearchIcon onPress={pressFunc2}></SearchIcon>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
