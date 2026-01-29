import MovieCard from "@/components/MovieCard";
import { getSavedMovies, Movie } from "@/services/storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadSavedMovies = async () => {
        setLoading(true);
        const movies = await getSavedMovies();
        setSavedMovies(movies);
        setLoading(false);
      };

      loadSavedMovies();
    }, []),
  );

  if (loading) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (savedMovies.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-900 justify-center items-center px-5">
        <Text className="text-white text-lg text-center">
          No saved movies yet.
        </Text>
        <Text className="text-slate-400 text-center mt-2">
          Find a movie you like and press the Save button to see it here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">Saved Movies</Text>
        <FlatList
          data={savedMovies}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              onPress={() => router.push(`/movie/${item.id}?movieType=movie`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Saved;
