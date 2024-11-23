import { Pressable, SafeAreaView, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import useDebounce from 'src/shared/hooks/useDebounce';
import ResetButton from '@assets/userSearch/resetButton.svg';

const UserSearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const debounceValue = useDebounce<string>(keyword, 300);

  useEffect(() => {
    if (debounceValue) {
      // 네트워크 요청
    }
  }, [debounceValue]);

  return (
    <SafeAreaView>
      <View className="px-[18px]">
        <View className="flex-row relative">
          <TextInput
            value={keyword}
            onChangeText={(text: string) => setKeyword(text)}
            className="border-2 border-gray100 bg-white border-r-2 px-5 py-2.5 flex-1"
            placeholder="닉네임으로 친구를 찾아보세요"
          />
          <Pressable onPress={() => setKeyword('')} className="absolute right-2 top-3">
            {keyword.length && <ResetButton />}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSearchScreen;
