import Loader from "@/components/LoadingStates";
import MovieCard from "@/components/MovieCard";
import SearchingBar from "@/components/SearchingBar";
import { fetchMovies, fetchPopularMovies, getImagePath } from "@/services/api";
import { getSavedMovies } from "@/services/storage";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bookmark } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  // Trending movies
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // Popular movies
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Saved movies
  const [savedMovieIds, setSavedMovieIds] = useState<Set<number>>(new Set());


  useFocusEffect(
    useCallback(() => {
      const loadSavedMovies = async () => {
        const saved = await getSavedMovies();
        setSavedMovieIds(new Set(saved.map((m) => m.id)));
      };
      loadSavedMovies();
    }, [])
  );

  useEffect(() => {
    // Fetch trending
    fetchMovies({ query: "" }).then((results) => {
      setTrendingMovies(results);
      setTrendingLoading(false);
    });
    // Fetch first page of popular
    fetchPopularMovies(1).then((data) => {
      setPopularMovies(data.results);
      setTotalPages(data.totalPages);
      setPopularLoading(false);
    });
  }, []);

  // Fetch more popular movies
  const loadMorePopular = () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    fetchPopularMovies(page + 1).then((data) => {
      setPopularMovies((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    });
  };

  const handleMoviePress = useCallback((id: number, movieType: string) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id, movieType: movieType },
    });
  }, [router]);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 bg-slate-950">
          {popularLoading && page === 1 ? (
            <Loader />
          ) : (
            <FlatList
              data={popularMovies}
              numColumns={3}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMorePopular}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 80 }} // Adjusted paddingBottom
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
              renderItem={({ item }) => (
                <MovieCard
                  item={item}
                  isSaved={savedMovieIds.has(item.id)}
                  style={{ width: '30%' }} // Adjust width to account for spacing
                  onPress={() =>
                    handleMoviePress(
                      item.id,
                      item.first_air_date !== undefined ? "tv" : "movie",
                    )
                  }
                />
              )}
              ListHeaderComponent={
                <>
                  <View className="w-full px-4 mt-4 mb-2">
                    <SearchingBar onPress={() => router.push("/search")} />
                    <Text className="text-white text-xl font-bold mt-6 mb-3">
                      Trending Movies
                    </Text>
                  </View>
                  
                  <View style={{ marginBottom: 20 }}>
                    {trendingLoading ? (
                      <Loader />
                    ) : (
                      <FlatList
                        data={trendingMovies}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) =>
                          item.id?.toString() || Math.random().toString()
                        }
                        contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={{ alignItems: 'center', width: 140 }}
                            onPress={() =>
                              handleMoviePress(
                                item.id,
                                item.first_air_date !== undefined ? "tv" : "movie",
                              )
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              source={{
                                uri: item.poster_path
                                  ? getImagePath(item.poster_path)
                                  : "https://via.placeholder.com/150x225/1e293b/fff?text=No+Image",
                              }}
                              style={{ width: 140, height: 210, borderRadius: 12 }}
                              resizeMode="cover"
                            />
                            {savedMovieIds.has(item.id) && (
                              <View className="absolute top-2 right-2 bg-blue-500/80 p-1.5 rounded-full">
                                <Bookmark size={16} color="#fff" fill="#fff" />
                              </View>
                            )}
                            <Text
                              style={{ 
                                color: 'white', 
                                fontSize: 14, 
                                marginTop: 8, 
                                textAlign: 'center',
                                fontWeight: '600'
                              }}
                              numberOfLines={1}
                            >
                              {item.title || item.name || "Untitled"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>

                  <View className="w-full px-4 mb-2">
                    <Text className="text-white text-xl font-bold mb-3">
                      Popular Movies
                    </Text>
                  </View>
                </>
              }
              ListFooterComponent={loadingMore ? <Loader /> : null}
            />
          )}

      </SafeAreaView>
    </>
  );
}
