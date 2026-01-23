import { Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  onPress: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchingBar = ({ onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center rounded-lg w-full p-2 border-b border-zinc-50">
      <Search color="#A1A1AA" className="size-5 font-thin" strokeWidth={1} />
      <TextInput
        className="flex-1 text-white text-sm ml-4"
        value={value}
        onChangeText={onChangeText}
        placeholder="Search For A Movice, Tv Show, Person......"
        placeholderTextColor="#A1A1AA"
        onPress={onPress}
      />
    </View>
  );
};

export default SearchingBar;

const styles = StyleSheet.create({});
