// import { View, Text, FlatList, RefreshControl } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import useFetch from "@/hooks/useFetch";
// import { getMovieList } from "@/lib/tmdb";
// import SearchInput from "@/components/SearchInput";
// import HorizontalList from "@/components/HorizontalList";
// import Empty from "@/components/Empty";

// const Home = () => {
// 	const { data: movies } = useFetch(() => getMovieList("popular"));
// 	const [refreshing, setRefreshing] = useState(false);

// 	const onRefresh = async () => {
// 		setRefreshing(true);
// 		// re call videos
// 		setRefreshing(false);
// 	};

// 	return (
// 		<SafeAreaView className="bg-primary h-full">
// 			<FlatList
// 				data={[{ id: 1 }]}
// 				keyExtractor={(item) => String(item.id)}
// 				renderItem={({ item }) => <Text className="text-3xl text-white">{item.id}</Text>}
// 				ListHeaderComponent={() => (
// 					<View className="my-6 px-4 space-y-6">
// 						{/* <View className="justify-between items-start flex-row mb-6"> */}
// 						<Text className="font-interSemiBold text-2xl text-white">Home</Text>
// 						{/* </View> */}

// 						<View className="w-full flex-1 pb-8">
// 							<Text className="text-white text-lg font-interSemiBold mb-2 ">Popular</Text>
// 							<View className="border border-red-500">
// 								<HorizontalList movies={movies ?? []} />
// 							</View>
// 						</View>
// 					</View>
// 				)}
// 				ListEmptyComponent={() => (
// 					<Empty title="No Movies." desc="Please try again later." showButton={false} />
// 				)}
// 				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
// 			/>
// 		</SafeAreaView>
// 	);
// };

// export default Home;

/*
import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "@/hooks/useFetch";
import { getMovieList } from "@/lib/tmdb";
import SearchInput from "@/components/SearchInput";
import HorizontalList from "@/components/HorizontalList";
import Empty from "@/components/Empty";

const Home = () => {
	const { data: nowPlayingMovies } = useFetch(() => getMovieList("now_playing"));
	const { data: popularMovies } = useFetch(() => getMovieList("popular"));
	const { data: topRatedMovies } = useFetch(() => getMovieList("top_rated"));
	const { data: upcomingMovies } = useFetch(() => getMovieList("upcoming"));

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		// re call videos
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={[
					{ id: "popular", name: "Popular", movies: popularMovies },
					{ id: "top_rated", name: "Top Rated", movies: topRatedMovies },
					{ id: "upcoming", name: "Upcoming", movies: upcomingMovies },
				]}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className="w-full flex-1 pb-8">
						<Text className="text-white text-lg font-interSemiBold mb-2 ">{item.name}</Text>
						<View className="border border-red-500">
							<HorizontalList movies={item.movies ?? []} />
						</View>
					</View>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<Text className="font-interSemiBold text-2xl text-white">Home</Text>
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
*/

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
import { router } from "expo-router";
import { ListType, Result } from "@/lib/types";
import { getMovieList } from "@/lib/tmdb";
import SearchInput from "@/components/SearchInput";

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
						<View className="flex-row items-center  mb-2 ">
							<Text className="text-white text-lg font-interSemiBold">{item.name}</Text>
							<TouchableOpacity
								onPress={() => handlePress(item.id)}
								activeOpacity={0.7}
								className={`bg-white rounded-lg w-10 h-[25px] justify-center ml-auto mr-4 items-center}`}
							>
								<Text className="text-center text-xs">All</Text>
							</TouchableOpacity>
						</View>
						<View className="">
							<HorizontalList movies={item.movies ?? []} />
						</View>
					</View>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 pl-4 space-y-6">
						<Text className="font-interSemiBold text-2xl text-white px-1">Home</Text>
						<SearchInput
							value={query}
							handleChangeText={() => {}}
							placeholder="Search for a movie."
							title="search"
						/>
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
