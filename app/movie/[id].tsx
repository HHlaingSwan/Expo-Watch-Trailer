import MovieCard from "@/components/MovieCard";
import {
  fetchMovieDetails,
  fetchSimilar,
  getImagePath,
} from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

const Details = () => {
  const { id, movieType } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(Number(id), movieType as string));

  const { data: similarMovies } = useFetch(() =>
    fetchSimilar(Number(id), movieType as string)
  );

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center px-5">
        <Text className="text-red-400 text-center">
          Error loading movie details
        </Text>
      </View>
    );
  }
  const trailer = movie?.videos?.results.find(
    (video: any) => video.type === "Trailer"
  );

  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="relative ">
          <Image
            source={{
              uri: getImagePath(movie?.backdrop_path || movie?.poster_path),
            }}
            resizeMode="cover"
            className="w-full h-[400px]"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </View>

        <View className="px-5 -mt-20">
          <View className="flex-row items-end gap-4">
            <Image
              source={{
                uri: getImagePath(movie?.poster_path),
              }}
              resizeMode="cover"
              className="w-32 h-48 rounded-lg shadow-lg"
            />
            <View className="flex-1 pb-2">
              <Text className="text-2xl text-white font-bold">
                {movie?.title || movie?.name || "Unknown Title"}
              </Text>
              <View className="flex-row items-center mt-2 gap-2">
                <View className="flex-row items-center bg-yellow-500/20 px-2 py-1 rounded-full">
                  <Text className="text-yellow-400 text-sm font-semibold">
                    ⭐
                  </Text>
                  <Text className="text-yellow-400 text-sm ml-1">
                    {movie?.vote_average?.toFixed(1) || "N/A"}
                  </Text>
                </View>
                <Text className="text-slate-400 text-sm">
                  {movie?.release_date?.split("-")[0] ||
                    movie?.first_air_date?.split("-")[0] ||
                    "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-xl text-white font-semibold mb-3">
              Overview
            </Text>
            <Text className="text-slate-300 leading-relaxed">
              {movie?.overview || "No overview available."}
            </Text>
          </View>
          {trailer && (
            <View className="mt-6">
              <Text className="text-xl text-white font-semibold mb-3">
                Trailer
              </Text>
              <YoutubeIframe
                height={215}
                play={isPlaying}
                videoId={trailer.key}
                onChangeState={onStateChange}
              />
            </View>
          )}

          {movie?.genres && movie.genres.length > 0 && (
            <View className="mt-6">
              <Text className="text-xl text-white font-semibold mb-3">
                Genres
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {movie.genres.map((genre: any) => (
                  <View
                    key={genre.id}
                    className="bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full"
                  >
                    <Text className="text-blue-300 text-sm">{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {movie?.credits?.cast && movie.credits.cast.length > 0 && (
            <View className="mt-6">
              <Text className="text-xl text-white font-semibold mb-3">
                Cast
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingHorizontal: 5 }}
              >
                {movie.credits.cast.slice(0, 10).map((actor: any) => (
                  <View key={actor.id} className="items-center w-24">
                    <Image
                      source={{
                        uri: getImagePath(actor.profile_path),
                      }}
                      resizeMode="cover"
                      className="w-20 h-20 rounded-full"
                    />
                    <Text
                      className="text-white text-xs mt-2 text-center"
                      numberOfLines={2}
                    >
                      {actor.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          <View className="mt-6 flex-row gap-4">
            {movie?.runtime && (
              <View className="flex-1">
                <Text className="text-slate-400 text-sm mb-1">Runtime</Text>
                <Text className="text-white font-medium">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Text>
              </View>
            )}
            <View className="flex-1">
              <Text className="text-slate-400 text-sm mb-1">Rating Count</Text>
              <Text className="text-white font-medium">
                {movie?.vote_count?.toLocaleString() || "0"} votes
              </Text>
            </View>
          </View>

          {movie?.production_companies &&
            movie.production_companies.length > 0 && (
              <View className="mt-6">
                <Text className="text-xl text-white font-semibold mb-3">
                  Production
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {movie.production_companies
                    .slice(0, 3)
                    .map((company: any) => (
                      <Text key={company.id} className="text-slate-300 text-sm">
                        {company.name}
                        {company.id !==
                          movie.production_companies.slice(0, 3)[
                            movie.production_companies.slice(0, 3).length - 1
                          ].id && " • "}
                      </Text>
                    ))}
                </View>
              </View>
            )}

          {similarMovies && similarMovies.length > 0 && (
            <View className="mt-6">
              <Text className="text-xl text-white font-semibold mb-4">
                Similar Movies
              </Text>
              <FlatList
                data={similarMovies}
                renderItem={({ item }) => (
                  <View className="w-40">
                    <MovieCard
                      item={item}
                      onPress={() => {
                        router.push(`/movie/${item.id}?movieType=movie`);
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingHorizontal: 5 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;
