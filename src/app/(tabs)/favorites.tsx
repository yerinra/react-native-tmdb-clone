import React, { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/hooks";
import { useFocusEffect } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import useFetch from "@/hooks/useFetch";
import { getAllUserFavorites, getAllUserRatings } from "@/lib/appwrite";
import Empty from "@/components/Empty";
import MyMovieCard from "@/components/MyMovieCard";
import Loading from "@/components/Loading";
import useSortAndFilter from "@/hooks/useSortAndFilter";
import { SORT_OPTIONS } from "@/lib/constants";
import { SortOptions } from "@/lib/types";

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
					<FavoritesHeader
						sortBy={sortBy}
						setSortBy={setSortBy}
						showRatedOnly={showRatedOnly}
						setShowRatedOnly={setShowRatedOnly}
					/>
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

type FavoritesHeaderProps = {
	sortBy: SortOptions;
	setSortBy: React.Dispatch<React.SetStateAction<SortOptions>>;
	showRatedOnly: boolean;
	setShowRatedOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavoritesHeader = ({
	sortBy,
	setSortBy,
	showRatedOnly,
	setShowRatedOnly,
}: FavoritesHeaderProps) => {
	return (
		<>
			<View className="flex my-6 px-4">
				<Text className=" text-gray-100 text-2xl">My Favorites</Text>
			</View>
			<ScrollView className="flex-row mt-2 px-2 mr-1" horizontal>
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
			</ScrollView>
			<View className="flex-row mt-1 px-2">
				<TouchableOpacity
					onPress={() => setShowRatedOnly((prev) => !prev)}
					className="flex-row items-center px-2 py-1 mb-6 mt-1"
				>
					<Text className={`${showRatedOnly ? "text-secondary" : "text-text"} text-xs mr-1`}>
						Show Rated Only
					</Text>
					<Octicons name="check" size={12} color={`${showRatedOnly ? "#8acda5" : "#0b101f"}`} />
				</TouchableOpacity>
			</View>
		</>
	);
};
