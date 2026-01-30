import { Tabs } from "expo-router";
import { Bookmark, House, Search, User } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({
  icon: Icon,
  name,
  focused,
}: {
  icon: any;
  name: string;
  focused: boolean;
}) => {
  if (focused) {
    return (
      <>
        <View className="flex-1 flex-row w-full min-w-[112px] gap-1  min-h-16 mt-6 rounded-full overflow-hidden items-center justify-center bg-indigo-400">
          <Icon
            strokeWidth={1.5}
            color="#151312"
            className="size-5 font-thin"
          />
          <Text className="text-gray-800 text-[12px] font-bold">{name}</Text>
        </View>
      </>
    );
  }
  return (
    <>
      <View className="flex-1 mt-6  rounded-full size-full items-center justify-center ">
        <Icon strokeWidth={1.5} color="#A1A1AA" className="size-5 font-thin" />
      </View>
    </>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginBottom: 34,
          marginHorizontal: 16,
          height: 60,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Search} name="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Bookmark} name="Save" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={User} name="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
