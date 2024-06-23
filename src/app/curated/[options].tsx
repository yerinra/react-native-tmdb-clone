import { Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import useMovieList from "@/hooks/useMovieList";
import type { ListType } from "@/lib/types";
import MovieCard from "@/components/MovieCard";
import Loading from "@/components/Loading";

const Curated = () => {
	const { options } = useLocalSearchParams();
	const option = options as ListType;
	const { data, loading, loadMore } = useMovieList(option);

	const convertOptionName = (option: ListType) => {
		if (option == "top_rated") return "Top Rated";
		else if (option == "popular") return "Popular";
		else return "Upcoming";
	};

	if (loading) return <Loading />;

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={data}
				numColumns={4}
				contentContainerStyle={{ margin: 0, gap: 4 }}
				renderItem={({ item }) => <MovieCard grid movie={item} />}
				keyExtractor={(item, kdx) => String(item.id) + kdx}
				ListHeaderComponent={() => (
					<Text className="my-6 px-4 text-gray-100 text-2xl">
						{convertOptionName(option as ListType)}
					</Text>
				)}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
			/>
		</SafeAreaView>
	);
};

export default Curated;
