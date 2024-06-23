import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "@/hooks/useFetch";
import { getAllUserFavorites, getAllUserRatings } from "@/lib/appwrite";
import Empty from "@/components/Empty";
import { useAppSelector } from "@/redux/hooks";
import MyMovieCard from "@/components/MyMovieCard";
import { useFocusEffect } from "expo-router";
import Loading from "@/components/Loading";
import { Octicons } from "@expo/vector-icons";
import useSortAndFilter from "@/hooks/useSortAndFilter";

type SortOptions = "release_date" | "popularity" | "rating" | "updated_at" | "title";

const SORT_OPTIONS = [
	{ id: "release_date", label: "Release Date" },
	{ id: "popularity", label: "Popularity" },
	{ id: "rating", label: "Rating" },
	{ id: "updated_at", label: "Rated At" },
	{ id: "title", label: "Title" },
];

const Ratings = () => {
	const { user } = useAppSelector((state) => state.user);
	const userId = user && user.$id;

	const {
		data: ratingsData,
		loading: ratingsLoading,
		refetch: refetchRatings,
	} = useFetch(() => getAllUserRatings(userId as string));

	const {
		data: favoritesData,
		loading: favoritesLoading,
		refetch: refetchFavorites,
	} = useFetch(() => getAllUserFavorites(userId as string));

	// const [sortBy, setSortBy] = useState<SortOptions>("release_date");
	// const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

	// const sortData = (sortBy: SortOptions, data: any[]) => {
	// 	if (!data) return [];
	// 	let sortedData = [...data];
	// 	switch (sortBy) {
	// 		case "release_date":
	// 			sortedData.sort(
	// 				(a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
	// 			);
	// 			break;
	// 		case "popularity":
	// 			sortedData.sort((a, b) => b.popularity - a.popularity);
	// 			break;
	// 		case "rating":
	// 			sortedData.sort((a, b) => b.rating - a.rating);
	// 			break;
	// 		case "updated_at":
	// 			sortedData.sort(
	// 				(a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
	// 			);
	// 			break;
	// 		case "title":
	// 			sortedData.sort((a, b) => {
	// 				if (a.title < b.title) return -1;
	// 				if (a.title > b.title) return 1;
	// 				return 0;
	// 			});
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// 	return sortedData;
	// };

	// const filteredData = () => {
	// 	if (!ratingsData || !favoritesData) return [];

	// 	let filtered = [...ratingsData];

	// 	if (showFavoritesOnly) {
	// 		filtered = filtered.filter((item) =>
	// 			favoritesData.some((fav) => fav.movieId === item.movieId),
	// 		);
	// 	}

	// 	return filtered;
	// };

	// const sortedAndFilteredData = sortData(sortBy, filteredData());
	const {
		sortBy,
		setSortBy,
		showFilteredOnly: showFavoritesOnly,
		setShowFilteredOnly: setShowFavoritesOnly,
		sortedAndFilteredData,
	} = useSortAndFilter(ratingsData);

	useFocusEffect(
		useCallback(() => {
			if (userId) {
				refetchRatings();
				refetchFavorites();
				setSortBy("release_date");
				setShowFavoritesOnly(false);
			}
		}, [userId]),
	);

	if (ratingsLoading || favoritesLoading) {
		return <Loading />;
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={sortedAndFilteredData(showFavoritesOnly ? "favorite" : null)}
				keyExtractor={(item, kdx) => String(item.id) + kdx}
				renderItem={({ item }) => <MyMovieCard movie={item} />}
				ListHeaderComponent={() => (
					<>
						<View className="flex my-6 px-4">
							<Text className=" text-gray-100 text-2xl">My Ratings</Text>
						</View>
						<View className="flex-row mt-2 px-4">
							{SORT_OPTIONS.map((option) => (
								<TouchableOpacity
									onPress={() => setSortBy(option.id as SortOptions)}
									className="px-2 py-1"
									key={option.id}
								>
									<Text
										className={`${option.id === sortBy ? "text-secondary underline" : "text-text"} text-xs`}
									>
										{option.label}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						<View className="flex-row mt-1 px-4">
							<TouchableOpacity
								onPress={() => setShowFavoritesOnly((prev) => !prev)}
								className="flex-row items-center px-2 py-1 mb-10 mt-1"
							>
								<Text
									className={`${showFavoritesOnly ? "text-secondary" : "text-text"} text-xs mr-1`}
								>
									Show Favorites Only
								</Text>
								<Octicons
									name="check"
									size={12}
									color={`${showFavoritesOnly ? "#8acda5" : "#0b101f"}`}
								/>
							</TouchableOpacity>
						</View>
					</>
				)}
				ListEmptyComponent={() => (
					<Empty
						title="No Movies Found"
						desc="Oops! Looks like there are no movies."
						showButton={true}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Ratings;
