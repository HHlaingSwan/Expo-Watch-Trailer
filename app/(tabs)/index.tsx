import Loader from "@/components/LoadingStates";
import MovieCard from "@/components/MovieCard";
import SearchingBar from "@/components/SearchingBar";
import {
  fetchMovies,
  fetchTrendingMoviesAndTvShows,
  getImagePath,
} from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Fetch popular movies on load
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingTvShows,
    loading: trendingTvShowsLoading,
    error: trendingTvShowsError,
    refetch: refetchTrendingTvShows,
  } = useFetch(() => fetchTrendingMoviesAndTvShows("tv"));

  const allContent = [...(trendingTvShows || []), ...(movies || [])];

  const sortedContent = [...(allContent || [])].sort(
    (a, b) =>
      new Date(b.release_date || b.first_air_date).getTime() -
      new Date(a.release_date || a.first_air_date).getTime(),
  );

  useEffect(() => {
    if (!sortedContent || sortedContent.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % sortedContent.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sortedContent]);

  const handleMoviePress = (id: number, movieType: string) => {
    console.log("type click", movieType);

    router.push({
      pathname: "/movie/[id]",
      params: { id, movieType: movieType },
    });
  };

  const featuredMovie = sortedContent?.[featuredIndex];

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      {moviesLoading || trendingTvShowsLoading ? (
        <Loader />
      ) : (
        <FlatList
          className="flex-1  w-full "
          numColumns={3}
          data={sortedContent || []}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 4,
          }}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              onPress={() =>
                handleMoviePress(
                  item.id,
                  item.first_air_date !== undefined ? "tv" : "movie",
                )
              }
            />
          )}
          ListHeaderComponent={
            <View className="w-full px-4 mb-4">
              <View className="mb-6">
                <SearchingBar onPress={() => router.push("/search")} />
              </View>

              {featuredMovie && (
                <View className="mb-6">
                  <TouchableOpacity
                    className="relative w-full h-80 rounded-2xl overflow-hidden"
                    onPress={() =>
                      handleMoviePress(
                        featuredMovie.id,
                        featuredMovie.first_air_date !== undefined
                          ? "tv"
                          : "movie",
                      )
                    }
                    activeOpacity={0.9}
                  >
                    <Image
                      source={{
                        uri: featuredMovie.poster_path
                          ? getImagePath(featuredMovie.poster_path)
                          : "https://via.placeholder.com/400x300/1e293b/fff?text=Featured",
                      }}
                      className="w-full h-full "
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <View className="absolute bottom-4 left-4 right-4">
                      <Text className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                        Featured
                      </Text>
                      <Text
                        className="text-white text-xl font-bold"
                        numberOfLines={2}
                      >
                        {featuredMovie.title || featuredMovie.name}
                      </Text>
                      <Text className="text-gray-300 text-sm mt-1">
                        {featuredMovie.release_date?.split("-")[0] ||
                          featuredMovie.first_air_date?.split("-")[0]}{" "}
                        •{" "}
                        <Text className="text-yellow-400">
                          ★ {featuredMovie.vote_average?.toFixed(1)}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <Text className="text-white text-xl font-bold mb-1">
                Explore Movies
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
