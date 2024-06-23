import { View, Text, FlatList, RefreshControl } from "react-native";

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import HorizontalList from "@/components/HorizontalList";
import Empty from "@/components/Empty";
import { Link } from "expo-router";
import { Result } from "@/lib/types";
import { getMovieList } from "@/lib/tmdb";
import SearchInput from "@/components/SearchInput";
import { Octicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";

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

	if (loading) {
		return <Loading />;
	}

	const CURATED_MOVIE_OPTIONS = [
		{ id: "popular", name: "Popular", movies: movies.popular },
		{ id: "top_rated", name: "Top Rated", movies: movies.topRated },
		{ id: "upcoming", name: "Upcoming", movies: movies.upcoming },
	];

	const renderItem = ({ item }: { item: { id: string; name: string; movies: Result[] } }) => (
		<View className="w-full flex-1 pb-8 pl-4">
			<View className="flex-row items-center mb-2 ">
				<Text className="text-white text-lg font-interSemiBold">{item.name}</Text>
				<Link href={`/curated/${item.id}`} className="ml-auto mr-4">
					<Octicons name="chevron-right" color="white" size={22} />
				</Link>
			</View>
			<View className="">
				<HorizontalList type="default" movies={item.movies ?? []} />
			</View>
		</View>
	);

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={CURATED_MOVIE_OPTIONS}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				ListHeaderComponent={() => <HomeHeader movies={movies} />}
				ListEmptyComponent={() => (
					<Empty title="No Movies." desc="Please try again later." showButton={false} />
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</SafeAreaView>
	);
};

export default Home;

type HomeHeaderProps = {
	nowPlaying: Result[];
	popular: Result[];
	topRated: Result[];
	upcoming: Result[];
};

const HomeHeader = ({ movies }: { movies: HomeHeaderProps }) => {
	return (
		<View className="my-6 pl-4 space-y-6">
			<View className="pr-4">
				<Text className="font-interBlack text-5xl text-center text-secondary px-1 tracking-widest">
					TMDB
				</Text>
				<SearchInput initialQuery="" />
			</View>
			<View>
				<Text className="text-white text-lg font-interSemiBold mb-2">Now Playing</Text>
				<HorizontalList type="backdrop" movies={movies.nowPlaying ?? []} />
			</View>
		</View>
	);
};
