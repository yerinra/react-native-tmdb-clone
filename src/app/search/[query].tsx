import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Empty from "@/components/Empty";

import useSearchResult from "@/hooks/useSearchResult";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

const Search = () => {
	const { query } = useLocalSearchParams();
	const { data: posts, loading, loadMore, reset } = useSearchResult(query as string);

	useEffect(() => {
		reset();
	}, []);

	const handleLoadMore = () => {
		if (!loading) {
			loadMore();
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				numColumns={4}
				contentContainerStyle={{ margin: 0, gap: 4 }}
				keyExtractor={(item, kdx) => String(item.id) + kdx}
				renderItem={({ item }) => <MovieCard grid movie={item} />}
				ListHeaderComponent={() => (
					<View className="flex my-6 px-4">
						<Text className=" text-gray-100 text-2xl">Search Results</Text>
						<View className="mt-3 mb-6">
							<SearchInput initialQuery={query as string} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<Empty
						title="No Videos Found"
						desc="No videos found for this search query"
						showButton={false}
					/>
				)}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
			/>
		</SafeAreaView>
	);
};

export default Search;
