import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import PlusButton from '@assets/follow/plusButton.svg';
import SubmitMessage from '@assets/follow/SubmitMessage.svg';
import CancelFollow from '@assets/follow/CancelFollow.svg';
import { useRecoilValue } from 'recoil';
import { profileStore } from '@recoil/store';
import Header from '@widgets/Header';
import { FollowScreenProps } from 'src/shared/stack/stack';
import BackArrowSvg from '@assets/WriteLetterScreen/backArrow.svg';
import { follow, getFollowingUser, getFollowUser, unfollow } from '@app/server/social/follow';

type FollowType = 'follow' | 'following';

interface UserItem {
  nickname: string;
  userId: number;
  followed: boolean;
}

const FollowScreen = ({ navigation }: FollowScreenProps) => {
  const profile = useRecoilValue(profileStore);
  const [cursor] = useState('2024-11-24T23:59:59');
  const [userList, setUserList] = useState<UserItem[]>([]);
  const [clickMode, setClickMode] = useState<FollowType>('follow');

  const handlePress = async (value: FollowType): Promise<void> => {
    setClickMode(value);
  };

  const handleUnFollow = async (id: number) => {
    await unfollow({ followUserId: id }, profile.userId);
  };

  const handleFollowing = async (id: number) => {
    await follow({ followUserId: id }, profile.userId);
  };

  const clickBorderColor = useCallback(
    (value: FollowType) => {
      return clickMode === value
        ? 'border-t-[5px] border-black100 font-semibold'
        : 'border-t-[5px] border-gray03 font-normal';
    },
    [clickMode],
  );

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response =
          clickMode === 'following'
            ? await getFollowingUser(profile.userId, {
                cursor: cursor,
                offset: 100,
              })
            : await getFollowUser(profile.userId, {
                cursor: cursor,
                offset: 100,
              });
        setUserList(response.data.follows);
      } catch (error) {
        throw new Error('Failed to fetch following users:');
      }
    };

    fetchdata();
  }, []);

  console.log(userList);
  return (
    <SafeAreaView>
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <View className="w-[24px] h-full px-[18px]">
        <Pressable className="h-full" onPress={() => navigation.goBack()}>
          <BackArrowSvg />
        </Pressable>
      </View>
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
        data={userList}
        className="py-3 px-[18px]"
        keyExtractor={(user) => user.userId.toString()}
        renderItem={(user) => (
          <View className="border-b-2 border-gray03">
            <View className="flex-row justify-between items-center p-[22px] font-semibold">
              <Text>{user.nickName}</Text>
              {clickMode === 'follow' ? (
                <View className="flex-row space-x-4">
                  <Pressable onPress={() => navigation.navigate('WriteLetterScreen')}>
                    <SubmitMessage />
                  </Pressable>
                  <Pressable onPress={() => handleUnFollow(user.userId)}>
                    <CancelFollow />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() =>
                    user.followed ? handleUnFollow(user.userId) : handleFollowing(user.userUd)
                  }
                >
                  {user.followed ? <CancelFollow /> : <PlusButton />}
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FollowScreen;
