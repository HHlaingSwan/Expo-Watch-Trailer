import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "expo-router";
import { getSavedMovies } from "@/services/storage";
import { Bell, ChevronRight, LogOut, Shield, User } from "lucide-react-native";

const menuItems = [
  { icon: User, text: "Edit Profile", href: "/edit-profile" },
  { icon: Bell, text: "Notifications", href: "/notifications" },
  { icon: Shield, text: "Privacy Policy", href: "/privacy" },
];

const Profile = () => {
  const [savedMoviesCount, setSavedMoviesCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadSavedMovies = async () => {
        const movies = await getSavedMovies();
        setSavedMoviesCount(movies.length);
      };
      loadSavedMovies();
    }, [])
  );

  return (
    <SafeAreaView className="bg-slate-900 flex-1">
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="p-6">
          {/* User Info */}
          <View className="items-center mt-4">
            <Image
              source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
              className="w-28 h-28 rounded-full mb-4 border-2 border-slate-500"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-white">John Doe</Text>
            <Text className="text-base text-slate-400 mt-1">john.doe@example.com</Text>
          </View>

          {/* Stats */}
          <View className="mt-8 flex-row justify-around bg-slate-800 p-4 rounded-lg">
            <View className="items-center">
              <Text className="text-xl font-bold text-white">{savedMoviesCount}</Text>
              <Text className="text-sm text-slate-400">Saved</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">123</Text>
              <Text className="text-sm text-slate-400">Watched</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-white">45</Text>
              <Text className="text-sm text-slate-400">Reviews</Text>
            </View>
          </View>

          {/* Menu */}
          <View className="mt-8 bg-slate-800 rounded-lg">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <Pressable className="flex-row items-center p-4">
                  <item.icon color="#a3a3a3" size={20} />
                  <Text className="text-white text-base ml-4">{item.text}</Text>
                  <ChevronRight color="#a3a3a3" size={20} className="ml-auto" />
                </Pressable>
                {index < menuItems.length - 1 && (
                  <View className="border-b border-slate-700 mx-4" />
                )}
              </React.Fragment>
            ))}
          </View>
          
          {/* Logout Button */}
          <Pressable className="mt-6 flex-row items-center justify-center bg-slate-800 p-4 rounded-lg">
              <LogOut color="#f87171" size={20} />
              <Text className="text-red-400 text-base font-semibold ml-3">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;