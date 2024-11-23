import React from 'react';
import { FlatList, Pressable, SafeAreaView, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import useDebounce from 'src/shared/hooks/useDebounce';
import ResetButton from '@assets/userSearch/resetButton.svg';
import Header from '@widgets/Header';
import { UserSearchScreenProps } from 'src/shared/stack/stack';
import { Text } from 'react-native-svg';
import BackArrowSvg from '@assets/WriteLetterScreen/backArrow.svg';
import { useRecoilValue } from 'recoil';
import { follow, getSearchUser, unfollow } from '@app/server/social/follow';
import { profileStore } from '@recoil/store';
import  CancelFollow from '@assets/follow/CancelFollow.svg';
import  Follow  from '@assets/follow/follow.svg';

interface UserItem {
  data:{
    nickname: string;
  userId: number;
  followed: boolean;
  }[]
}


const UserSearchScreen = ({ navigation }: UserSearchScreenProps) => {
  const {userId}=useRecoilValue(profileStore)
  const [keyword, setKeyword] = useState('');
  const [userList,setUserList]=useState<UserItem>()
  const debounceValue = useDebounce<string>(keyword, 300);

  const handleUnFollow = async (id: number) => {
    await unfollow({ followUserId: id }, userId);
  };

  const handleFollowing = async (id: number) => {
    await follow({ followUserId: id }, userId);
  };

  useEffect(() => {
    if (debounceValue) {
      const fetchData=async() =>{
        const response=await getSearchUser(userId,{name:debounceValue,cursor:'2024-11-24T23:59:59',offset:100});
        setUserList(response);
      }
    }
  }, [debounceValue]);

  console.log(userList);
  return (
    <SafeAreaView>
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <View className="px-[18px]">
        <View className="w-[24px] h-full">
          <Pressable className="h-full" onPress={() => navigation.goBack()}>
            <BackArrowSvg />
          </Pressable>
        </View>
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
          <FlatList
            data={userList}
            className="py-3 px-[18px]"
            keyExtractor={(user) => user.userId}
            renderItem={(user) => (
              <View className="border-b-2 border-gray03">
                <View className="flex-row justify-between items-center p-[22px] font-semibold">
                  <Text>{user.userNickName}</Text>
                  <Pressable
                  onPress={() =>
                    user.followed ? handleUnFollow(user.userId) : handleFollowing(user.userUd)
                  }
                >
                  {user.followed ? <CancelFollow /> : <Follow />}
                </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserSearchScreen;
