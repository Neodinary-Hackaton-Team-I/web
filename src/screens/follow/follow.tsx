import { useCallback, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import Follow from '@assets/follow/Follow.svg';
import SubmitMessage from '@assets/follow/SubmitMessage.svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type FollowType = 'follow' | 'following';

const FollowScreen = () => {
  const [clickMode, setClickMode] = useState<FollowType>('follow');

  const handlePress = (value: FollowType) => {
    setClickMode(value);
  };

  const clickBorderColor = useCallback(
    (value: FollowType) => {
      return clickMode === value
        ? 'border-t-[5px] border-black100 font-semibold'
        : 'border-t-[5px] border-gray03 font-normal';
    },
    [clickMode],
  );

  return (
    <SafeAreaView>
      <View className="flex-row justify-between">
        <Pressable
          className={`${clickBorderColor('follow')} flex-1 items-center p-2.5`}
          onPress={() => handlePress('follow')}
        >
          <Text>팔로잉</Text>
        </Pressable>
        <Pressable
          className={`${clickBorderColor('following')} flex-1 items-center p-2.5`}
          onPress={() => handlePress('following')}
        >
          <Text>팔로워</Text>
        </Pressable>
      </View>
      <FlatList
        data={DATA}
        className="py-3 px-[18px]"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border-b-2 border-gray03">
            <View className="flex-row justify-between items-center p-[22px] font-semibold">
              <Text>{item.title}</Text>
              <View className="flex-row space-x-4">
                <Pressable>
                  <SubmitMessage />
                </Pressable>
                <Pressable>
                  <Follow />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FollowScreen;
