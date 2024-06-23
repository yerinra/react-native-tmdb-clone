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

	const {
		sortBy,
		setSortBy,
		showFilteredOnly: showFavoritesOnly,
		setShowFilteredOnly: setShowFavoritesOnly,
		sortedAndFilteredData,
	} = useSortAndFilter(ratingsData, favoritesData);

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
				renderItem={({ item }) => <MyMovieCard movie={item} rating />}
				ListHeaderComponent={() => (
					<>
						<View className="flex my-6 px-4">
							<Text className=" text-gray-100 text-2xl">My Ratings</Text>
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
								onPress={() => setShowFavoritesOnly((prev) => !prev)}
								className="flex-row items-center px-2 py-1 mb-6 mt-1"
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
