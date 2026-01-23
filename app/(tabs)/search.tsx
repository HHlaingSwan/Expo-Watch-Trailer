import Loader from "@/components/LoadingStates";
import MovieCard from "@/components/MovieCard";
import SearchingBar from "@/components/SearchingBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { CrossIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
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
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <View className="mb-4 px-5 bg-orange-600 ">
        <View className="relative ">
          <SearchingBar
            onPress={() => router.push("/search")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <CrossIcon
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
            onPress={() => setSearchQuery("")}
          />
        </View>
        {searchQuery.length > 0 && (
          <Text className="text-slate-300 text-lg mt-4 font-semibold">
            You're searching is "{searchQuery}"
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

export default search;

const styles = StyleSheet.create({});
