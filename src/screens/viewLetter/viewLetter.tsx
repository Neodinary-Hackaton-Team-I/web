import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

const ViewLetterScreen = () => {
  return (
    <SafeAreaView>
      <View className="px-[18px]">
        <Image />
        <ScrollView className="border-2 border-gray03 px-6 py-4 w-full h-full">
          <Text>편지 텍스트 영역...</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewLetterScreen;
