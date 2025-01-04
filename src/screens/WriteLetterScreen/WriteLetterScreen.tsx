import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CheckedSvg from '@assets/WriteLetterScreen/checkedBox.svg';
import UnCkeckedSvg from '@assets/WriteLetterScreen/unCheckedBox.svg';
import BackArrowSvg from '@assets/WriteLetterScreen/backArrow.svg';
import DefaultImageSvg from '@assets/WriteLetterScreen/defaultImage.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import { WriteLetterScreenProps } from 'src/shared/stack/stack';
import Header from '@widgets/Header';
import Modal from '@widgets/modal';
import { getFollowingList } from '@app/server/writeLetter/writeLetter';
import { useRecoilValue } from 'recoil';
import { profileStore } from '@recoil/store';
import { axiosInstance } from '@axios/axios.Instance';
import axios from 'axios';

interface UserItem {
  nickName: string;
  userId: number;
}

const WriteLetterScreen = ({ navigation }: WriteLetterScreenProps) => {
  const profile = useRecoilValue(profileStore);

  const [isCheckedBox, setIsCheckedBox] = useState<boolean>(false);
  const [receiverList, setReceiverList] = useState<UserItem[]>([]);
  const [receiverId, setRecieverId] = useState<number>(0);
  const [receiverNickname, setRecieverNickname] = useState<string>('');
  const [letterValue, setLetterValue] = useState<string>('');
  // image
  const [formData, setFormData] = useState();
  const [s3Url, setS3Url] = useState(undefined);
  const [imageUri, setImageUri] = useState<string>();
  const [isOverlay, setIsOverlay] = useState(false);

  // 검색 api 이용할 때,
  // const debouncedValue = useDebounce(receiverNickname, 400);
  const isValid = receiverId !== 0 && letterValue.length !== 0 && imageUri !== undefined;

  const onSelectImage = async () => {
    launchImageLibrary({ mediaType: 'photo', maxWidth: 108, maxHeight: 108 }, async (res) => {
      if (res.didCancel || !res.assets) {
        return;
      }
      if (res.errorCode) {
        console.log(res.errorCode);
      }
      const image = res.assets[0];
      const reader = new FileReader();

      const { uri, type } = image;
      setImageUri(uri);

      const preSignedUrlRes = await axiosInstance.get('/api/v1/files/presigned-url');
      const preSignedUrl = preSignedUrlRes?.data?.data?.url.replace(/export/g, '');

      if (preSignedUrlRes.data.status !== 200) {
        return;
      }
      const response = await fetch(uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
        xhr.responseType = 'blob'; // Blob으로 응답 설정
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response); // 성공적으로 Blob 생성
          } else {
            reject(new Error(`Failed to fetch Blob. Status: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error('Failed to fetch Blob.'));
        xhr.send();
      });

      const putRes = await axios.put(preSignedUrl, blob, {
        headers: {
          'Content-Type': type,
        },
      });
      setS3Url(preSignedUrl.split('?')[0]);
    });
  };

  const handleSubmit = async () => {
    // receiver , letterValue,imageValue (FormData) 전송
    const res = await axiosInstance.post('/api/v1/letters', {
      imageUrl:
        'https://umcmc-s3-bucket.s3.ap-northeast-2.amazonaws.com/uploads/images/df6b625f-505b-4da1-8f78-8517da43a694',
      body: letterValue,
      senderId: profile.userId,
      receiverId: receiverId,
    });
    console.log(res);
    navigation.navigate('WriteLetterCompleteScreen', { receiver: receiverNickname });
  };

  const handleLetterValue = (text: string) => {
    setRecieverNickname(text);
  };

  const handleTouch = () => {
    setIsOverlay(false);
  };

  const getUserList = async () => {
    const response = await getFollowingList(profile.userId, '2024-11-24T23:59:59', 100);

    setReceiverList(response.data.follows);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        pressFunc1={() => navigation.navigate('FollowScreen')}
        pressFunc2={() => navigation.navigate('UserSearchScreen')}
      />
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View className=" h-full px-[18px] flex  align-center">
          <View className="w-full h-[24px] justify-start ">
            {/* SVG 파일 대체 (뒤로 가기)  */}
            <View className="w-[24px] h-full ">
              <Pressable className="h-full" onPress={() => navigation.goBack()}>
                <BackArrowSvg />
              </Pressable>
            </View>
            {/* 나에게 작성하기 */}
            <View className="w-full h-[24px] flex flex-row mt-[28px] mb-[10px] items-center">
              <Pressable
                className="w-[24px]"
                onPress={() => {
                  const nextCheckedState = !isCheckedBox; // 현재 상태를 반전
                  setIsCheckedBox(nextCheckedState); // 상태 업데이트
                  setRecieverId(profile.userId);
                  setRecieverNickname(nextCheckedState ? '나에게' : ''); // 반전된 상태에 따라 수신자 업데이트
                }}
              >
                {isCheckedBox ? <CheckedSvg /> : <UnCkeckedSvg />}
              </Pressable>
              <Text className="text-gray01">나에게 작성하기</Text>
            </View>
            {/* 수신자 */}
            <View className="relative w-full h-[56px]">
              <Text className="absolute left-0 bottom-[20px]">To .</Text>
              <TextInput
                className={`w-full h-14 border-b ${
                  receiverNickname !== undefined &&
                  receiverNickname !== '' &&
                  receiverNickname.length === 0
                    ? 'border-red200'
                    : 'border-gray03'
                } pl-8`}
                value={receiverNickname}
                onTouchStart={() => setIsOverlay(true)}
                onChangeText={(text: string) => handleLetterValue(text)}
                placeholder="수신자 입력"
              />
              {isOverlay && (
                <Modal.Container>
                  <Modal.Item
                    input={receiverNickname}
                    userList={receiverList}
                    onPress={(user: UserItem) => {
                      setRecieverId(user.userId);
                      setRecieverNickname(user.nickName);
                      setIsOverlay(false);
                    }}
                  />
                </Modal.Container>
              )}
            </View>
            {/* 편지 작성 */}
            <View className="w-full h-[244px] mt-[38px] flex">
              <View className="w-full h-[19px] mb-[12px]">
                <Text className="text-base font-semibold">편지 작성</Text>
              </View>
              <TextInput
                className={`w-full h-[188px] border ${
                  letterValue.length === 0 ? 'border-red200' : 'border-gray03'
                } p-2`}
                multiline
                placeholder="편지 내용을 입력하세요"
                onChangeText={(text: string) => setLetterValue(text)}
                maxLength={500}
              />
              <View className="flex items-end">
                <Text className="text-[12px] text-gray01 right-0">{letterValue.length} / 500</Text>
              </View>

              {/* 사진 첨부 */}
              <View className="w-full h-[92px]  mt-[28px]">
                <Text className="h-[19px] mb-[12px] ">사진 첨부</Text>
                <View className="w-full h-[144px] mb-[28px] border border-gray03 flex-row justify-around items-center">
                  <View className="w-[100px] h-[112px] border border-gray03 flex items-center justify-center">
                    {imageUri ? (
                      <Image source={{ uri: imageUri }} width={100} height={112} />
                    ) : (
                      <DefaultImageSvg />
                    )}
                  </View>
                  <Pressable
                    className="w-[160px] h-[36px] border border-gray03 flex justify-center items-center"
                    onPress={onSelectImage}
                  >
                    <Text className="text-gray01">사진 업로드</Text>
                  </Pressable>
                </View>
              </View>

              {/* 완료하기 버튼 */}
              <Pressable
                className={`w-full mt-[100px] h-[56px] ${
                  isValid ? 'bg-red200' : 'bg-[#D7D7D7]'
                } flex items-center justify-center rounded-[10px]`}
                disabled={!isValid}
                onPress={handleSubmit}
              >
                <Text className="text-white">완료하기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default WriteLetterScreen;
