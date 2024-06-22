import {
	View,
	Text,
	FlatList,
	RefreshControl,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HorizontalList from "@/components/HorizontalList";
import Empty from "@/components/Empty";
import { Link, router } from "expo-router";
import { ListType, Result } from "@/lib/types";
import { getMovieList } from "@/lib/tmdb";
import SearchInput from "@/components/SearchInput";
import { Octicons } from "@expo/vector-icons";

const Home = () => {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<{
		nowPlaying: Result[];
		popular: Result[];
		topRated: Result[];
		upcoming: Result[];
	}>({
		nowPlaying: [],
		popular: [],
		topRated: [],
		upcoming: [],
	});

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchMovies = async () => {
		setLoading(true);
		try {
			const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
				getMovieList("now_playing"),
				getMovieList("popular"),
				getMovieList("top_rated"),
				getMovieList("upcoming"),
			]);
			setMovies({
				nowPlaying,
				popular,
				topRated,
				upcoming,
			});
		} catch (error) {
			console.error("Failed to fetch movies:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchMovies();
		setRefreshing(false);
	};

	const handlePress = (option: Omit<ListType, "now_playing">) => {
		router.push(`/curated/${option}`);
	};

	if (loading) {
		return (
			<SafeAreaView className="bg-primary h-full flex justify-center items-center">
				<ActivityIndicator size="large" color="#fff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={[
					{ id: "popular", name: "Popular", movies: movies.popular },
					{ id: "top_rated", name: "Top Rated", movies: movies.topRated },
					{ id: "upcoming", name: "Upcoming", movies: movies.upcoming },
				]}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className="w-full flex-1 pb-8 pl-4">
						<View className="flex-row items-center mb-2 ">
							<Text className="text-white text-lg font-interSemiBold">{item.name}</Text>
							<Link href={`/curated/${item.name}`} className="ml-auto mr-4">
								<Octicons name="chevron-right" color="white" size={22} />
							</Link>
						</View>
						<View className="">
							<HorizontalList type="default" movies={item.movies ?? []} />
						</View>
					</View>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 pl-4 space-y-6">
						<View className="pr-4">
							<Text className="font-Black text-xl text-secondary px-1 tracking-widest">TMDB</Text>
							<SearchInput
								value={query}
								handleChangeText={() => {}}
								placeholder="Search for a movie."
								title="search"
							/>
						</View>
						<View>
							<Text className="text-white text-lg font-interSemiBold mb-2">Now Playing</Text>
							<HorizontalList backdrop={true} movies={movies.nowPlaying ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<Empty title="No Movies." desc="Please try again later." showButton={false} />
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</SafeAreaView>
	);
};

export default Home;
