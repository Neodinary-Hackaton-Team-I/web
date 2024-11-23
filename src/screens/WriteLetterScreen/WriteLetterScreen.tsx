import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LetterSchema = z.object({
  to: z.string().min(1, '수신자를 입력해주세요'),
  message: z.string().min(1, '편지 내용을 작성해주세요.').max(500, '500자를 초과할 수 없습니다.'),
});

const WriteLetterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LetterSchema),
    defaultValues: {
      to: '',
      message: '',
    },
  });
  return (
    <SafeAreaView>
      <View className="border-2 border-red200 h-full px-[18px] flex  align-center">
        <View className="w-full h-[24px] justify-start border-2 border-red200">
          {/* SVG 파일 대체 (뒤로 가기)  */}
          <View className="w-[24px] h-full border-2 border-b-black100">
            <Pressable>
              <Text>뒤로</Text>
            </Pressable>
          </View>
          {/* 나에게 작성하기 */}
          <View className="w-full h-[24px] flex flex-row mt-[28px] mb-[10px] items-center">
            <Pressable className="w-[24px] h-[24px] border border-gray03 mr-3">체크박스</Pressable>
            <Text className="text-gray01">나에게 작성하기</Text>
          </View>
          {/* 수신자 */}
          <View className="relative w-full h-[56px] mb-10">
            <Text className="absolute left-0 bottom-[18px]">To .</Text>
            <Controller
              control={control}
              name="to"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`w-full h-14 border-b ${
                    errors.to ? 'border-red-500' : 'border-gray-300'
                  } pl-8`}
                  placeholder="수신자 입력"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.to && <Text className="text-red-500 text-xs mt-1">{errors.to.message}</Text>}
            <Pressable className="absolute w-[34px] h-[34px] rounded-full bg-[#DC3845] right-0 bottom-2 flex items-center justify-center">
              <Text className="text-white text-base">{'>'}</Text>
            </Pressable>
          </View>
          {/* <View className="relative w-full h-[56px]">
            <Text className="absolute left-0 bottom-[18px]">To .</Text>
            <TextInput className="w-full h-full border-b border-b-gray03 mb-[38px] text-black pl-[33px]"></TextInput>
            <Pressable className="w-[34px] h-[34px] absolute rounded-full bg-[#DC3845] right-0 bottom-[11px] items-center justify-center">
              <Text className="text-white text-[16px]">{'>'}</Text>
            </Pressable>
          </View> */}

          {/* 편지 작성 */}
          <View className="w-full h-[244px] mt-[38px] flex">
            <View className="w-full h-[19px] mb-[12px]">
              <Text className="text-base font-semibold">편지 작성</Text>
            </View>
            <TextInput
              className="w-full h-[188px] border border-gray03 px-2 mb-[10px]"
              multiline={true}
            ></TextInput>
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
