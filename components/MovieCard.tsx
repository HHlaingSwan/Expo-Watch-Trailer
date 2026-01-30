import { getImagePath } from "@/services/api";
import { Bookmark } from "lucide-react-native";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
  };
  onPress?: () => void;
  style?: any;
  showTitle?: boolean;
  isSaved?: boolean;
}

function MovieCard({
  item,
  onPress,
  style,
  showTitle,
  isSaved,
}: MovieCardProps) {
  const title = item.title || item.name || "Unknown";
  const date = item.release_date || item.first_air_date || "";
  const voteColor = item.vote_average
    ? item.vote_average >= 7
      ? "#22c55e"
      : item.vote_average >= 5
        ? "#eab308"
        : "#ef4444"
    : "#6b7280";

  const card = (
    <TouchableOpacity
      className="flex-1 m-1 bg-slate-900 rounded-xl overflow-hidden"
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        ...style,
      }}
    >
      <View className="relative">
        <Image
          source={{
            uri: item.poster_path
              ? getImagePath(item.poster_path)
              : "https://via.placeholder.com/150x225/1e293b/fff?text=No+Image",
          }}
          className="w-full h-[180px]"
          resizeMode="cover"
        />
        {isSaved && (
          <View className="absolute top-2 right-2 bg-blue-500/80 p-1.5 rounded-full">
            <Bookmark size={12} color="#fff" fill="#fff" />
          </View>
        )}
        <View
          className="absolute top-2 left-2 px-2 py-1 rounded-full items-center justify-center"
          style={{ backgroundColor: voteColor }}
        >
          <Text className="text-white text-[10px] font-bold">
            {item.vote_average?.toFixed(1) || "N/A"}
          </Text>
        </View>
      </View>
      {!showTitle && (
        <View className="p-2 bg-slate-900">
          <Text
            className="text-white text-[12px] font-semibold"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text className="text-gray-500 text-[10px] mt-1">
            {date.split("-")[0] || "N/A"}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (showTitle) {
    return (
      <View style={{ alignItems: "center", width: 140 }}>
        {card}
        <Text
          style={{
            color: "white",
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    );
  }

  return card;
}

export default memo(MovieCard);
