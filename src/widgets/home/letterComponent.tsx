import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import PrevButton from '@assets/home/prevButton.svg';
import NextButton from '@assets/home/nextButton.svg';

import OpenedLetter from '@assets/home/openedLetter.svg';
import NotOpenedLetter from '@assets/home/notOpenedLetter.svg';

interface Letter {
  letterId: number;
  date: string;
  writer: string;
  isOpened: boolean;
}

interface LetterComponentProps {
  letterList: {
    [key: string]: Letter[];
  };
}

const LetterComponent: React.FC<LetterComponentProps> = ({ letterList }) => {
  const [visibleLetterIndex, setVisibleLetterIndex] = useState<{
    [key: string]: number;
  }>({});

  const handlePrev = (key: string) => {
    setVisibleLetterIndex((prev) => {
      const currentIndex = prev[key] || 0;
      return {
        ...prev,
        [key]: Math.max(currentIndex - 1, 0),
      };
    });
  };

  const handleNext = (key: string, lettersLength: number) => {
    setVisibleLetterIndex((prev) => {
      const currentIndex = prev[key] || 0;
      return {
        ...prev,
        [key]: Math.min(currentIndex + 1, lettersLength - 1),
      };
    });
  };

  const handleDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${month}-${day}`;
  };

  return (
    <View className="flex flex-col">
      {Object.entries(letterList).map(([key, letters]) => {
        const currentIndex = visibleLetterIndex[key] || 0;
        const currentLetter = letters[currentIndex];

        return (
          <View key={key} className="flex flex-row items-center mb-4 space-x-10">
            <View className="bg-white py-10">
              <Text className="ml-8 bg-white z-40 py-[10px] font-semibold text-2xl font-['ZenDots-Regular']">
                {handleDate(key)}
              </Text>
            </View>
            <View className="relative flex flex-col items-center">
              {currentIndex > 0 && (
                <Pressable
                  onPress={() => handlePrev(key)}
                  className="absolute -left-4 top-[40%] z-10 drop-shadow-button"
                >
                  <PrevButton />
                </Pressable>
              )}

              {currentLetter.isOpened ? (
                <View className="relative">
                  <OpenedLetter />
                  <View className="absolute top-4 left-12 space-y-8">
                    <Image source={require('../../shared/assets/home/gift4.png')} />
                    <Text className="text-center text-[#282525] text-sm font-semibold">
                      From{'\n'}
                      <Text className="text-[#5D5656] text-[10px]">{currentLetter.writer}</Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="relative">
                  <NotOpenedLetter />
                  <View className="absolute top-4 left-12 space-y-8">
                    <Image source={require('../../shared/assets/home/gift4.png')} />
                    <Text className="text-center text-[#282525] text-sm font-semibold">
                      From{'\n'}
                      <Text className="text-[#5D5656] text-[10px]">{currentLetter.writer}</Text>
                    </Text>
                  </View>
                </View>
              )}

              {currentIndex < letters.length - 1 && (
                <Pressable
                  onPress={() => handleNext(key, letters.length)}
                  className="absolute -right-4 top-[40%] z-10 drop-shadow-button"
                >
                  <NextButton />
                </Pressable>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LetterComponent;
