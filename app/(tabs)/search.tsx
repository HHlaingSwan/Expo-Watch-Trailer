import Loader from "@/components/LoadingStates";
import MovieCard from "@/components/MovieCard";
import SearchingBar from "@/components/SearchingBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    refetch,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        refetch();
      } else {
        refetch();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, refetch]);

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <View className="mb-4 bg-slate-950 px-5 pt-4">
        <View className="relative rounded-lg">
          <SearchingBar value={searchQuery} onChangeText={setSearchQuery} />
          {searchQuery.length > 0 && (
            <TouchableOpacity className="absolute top-4  right-2">
              <X
                onPress={() => setSearchQuery("")}
                color="#fff"
                className="size-5 font-thin"
                strokeWidth={1}
              />
            </TouchableOpacity>
          )}
        </View>
        {searchQuery.length > 0 && (
          <Text className="text-slate-300 text-lg mt-4 font-semibold">
            You&apos;re searching for &quot;{searchQuery}&quot;
          </Text>
        )}
      </View>
      {searchQuery.length > 0 && moviesLoading && (
        <View className="flex-1 justify-center items-center">
          <Loader />
        </View>
      )}
      <FlatList
        className="flex-1 w-full "
        numColumns={3}
        data={movies || []}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 4,
        }}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/movie/[id]",
                params: {
                  id: item.id,
                  movieType: item.first_air_date !== undefined ? "tv" : "movie",
                },
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
