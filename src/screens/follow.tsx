import { useCallback, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
// import Follow from '@assets/follow/follow.svg';

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
        : 'border-t-[5px] border-gray300 font-normal';
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
          <View className="border-b-2 border-gray300">
            <View className="flex-row justify-between p-[22px] font-semibold">
              <Text>{item.title}</Text>
              <View>
                <Pressable>
                  <Text>{item.title}</Text>
                </Pressable>
                <Pressable>
                  <Text>{item.title}</Text>
                </Pressable>
                {/* <Follow /> */}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FollowScreen;
