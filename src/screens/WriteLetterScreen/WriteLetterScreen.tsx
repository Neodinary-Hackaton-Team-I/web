import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import CheckedSvg from '@assets/WriteLetterScreen/checkedBox.svg';
import UnCkeckedSvg from '@assets/WriteLetterScreen/unCheckedBox.svg';
import BackArrowSvg from '@assets/WriteLetterScreen/backArrow.svg';
import { launchImageLibrary } from 'react-native-image-picker';

const WriteLetterScreen = () => {
  const [isCheckedBox, setIsCheckedBox] = useState<boolean>(false);
  const [receiver, setReciever] = useState<string>('');
  const [letterValue, setLetterValue] = useState<string>('');
  const [imageValue, setImageValue] = useState(undefined);

  const isValid = receiver.length !== 0 && letterValue.length !== 0 && imageValue !== undefined;

  return (
    <SafeAreaView>
      <View className=" h-full px-[18px] flex  align-center">
        <View className="w-full h-[24px] justify-start ">
          {/* SVG 파일 대체 (뒤로 가기)  */}
          <View className="w-[24px] h-full ">
            <Pressable className="h-full">
              <BackArrowSvg />
            </Pressable>
          </View>
          {/* 나에게 작성하기 */}
          <View className="w-full h-[24px] flex flex-row mt-[28px] mb-[10px] items-center">
            <Pressable className="w-[24px]" onPress={() => setIsCheckedBox((prev) => !prev)}>
              {isCheckedBox ? <CheckedSvg /> : <UnCkeckedSvg />}
            </Pressable>
            <Text className="text-gray01">나에게 작성하기</Text>
          </View>
          {/* 수신자 */}
          <View className="relative w-full h-[56px] mb-10">
            <Text className="absolute left-0 bottom-[18px]">To .</Text>
            <TextInput
              className={`w-full h-14 border-b ${
                receiver.length === 0 ? 'border-red200' : 'border-gray03'
              } pl-8`}
              onChangeText={(text: string) => setReciever(text)}
              placeholder="수신자 입력"
            />
            {/* <Pressable className="absolute w-[34px] h-[34px] rounded-full bg-[#DC3845] right-0 bottom-2 flex items-center justify-center">
              <Text className="text-white text-base">{'>'}</Text>
            </Pressable> */}
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
            />
            <View className="flex items-end">
              <Text className="text-[12px] text-gray01 right-0">{'zz'} / 500</Text>
            </View>
          </View>

          {/* 사진 첨부 */}
          <View className="w-full h-[92px] mb-[45px] mt-[28px]">
            <Text className="h-[19px] mb-[12px] ">사진 첨부</Text>
            <Pressable className="w-full h-[60px] border border-gray03 flex justify-center items-center">
              <Text className="text-gray01">사진 업로드</Text>
            </Pressable>
          </View>

          {/* 완료하기 버튼 */}
          <Pressable className="w-full h-[56px] border border-gray03 bg-[#D7D7D7] flex items-center justify-center rounded-[10px]">
            <Text className="text-white">완료하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WriteLetterScreen;
