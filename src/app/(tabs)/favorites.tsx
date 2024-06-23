import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
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
import { SORT_OPTIONS } from "@/lib/constants";

type SortOptions = "release_date" | "popularity" | "rating" | "updated_at" | "title";

const Favorites = () => {
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

	const {
		sortBy,
		setSortBy,
		showFilteredOnly: showRatedOnly,
		setShowFilteredOnly: setShowRatedOnly,
		sortedAndFilteredData,
	} = useSortAndFilter(favoritesData, ratingsData);

	useFocusEffect(
		useCallback(() => {
			if (userId) {
				refetchFavorites();
				refetchRatings();
				setSortBy("release_date");
				setShowRatedOnly(false);
			}
		}, [userId]),
	);

	if (favoritesLoading || ratingsLoading) {
		return <Loading />;
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={sortedAndFilteredData(showRatedOnly ? "rating" : null)}
				keyExtractor={(item, kdx) => String(item.id) + kdx}
				renderItem={({ item }) => <MyMovieCard movie={item} rating={false} />}
				ListHeaderComponent={() => (
					<>
						<View className="flex my-6 px-4">
							<Text className=" text-gray-100 text-2xl">My Favorites</Text>
						</View>
						<View className="flex-row mt-2 px-2">
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
						<View className="flex-row mt-1 px-2">
							<TouchableOpacity
								onPress={() => setShowRatedOnly((prev) => !prev)}
								className="flex-row items-center px-2 py-1 mb-6 mt-1"
							>
								<Text className={`${showRatedOnly ? "text-secondary" : "text-text"} text-xs mr-1`}>
									Show Rated Only
								</Text>
								<Octicons
									name="check"
									size={12}
									color={`${showRatedOnly ? "#8acda5" : "#0b101f"}`}
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

export default Favorites;
