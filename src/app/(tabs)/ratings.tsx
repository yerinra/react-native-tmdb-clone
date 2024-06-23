import { View, Text, FlatList } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "@/hooks/useFetch";
import { getAllUserRatings } from "@/lib/appwrite";
import Empty from "@/components/Empty";
import { useAppSelector } from "@/redux/hooks";
import MyMovieCard from "@/components/MyMovieCard";
import { useFocusEffect } from "expo-router";
import Loading from "@/components/Loading";

const Ratings = () => {
	const { user } = useAppSelector((state) => state.user);
	const userId = user && user.$id;
	const { data, loading, refetch } = useFetch(() => getAllUserRatings(userId as string));

	useFocusEffect(
		useCallback(() => {
			if (userId) {
				refetch();
			}
		}, [userId]),
	);

	if (loading) {
		return <Loading />;
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={data}
				// numColumns={3}
				// contentContainerStyle={{ margin: 0, gap: 24, alignItems: "center" }}
				keyExtractor={(item, kdx) => String(item.id) + kdx}
				renderItem={({ item }) => <MyMovieCard movie={item} />}
				ListHeaderComponent={() => (
					<>
						<View className="flex my-6 px-4">
							<Text className=" text-gray-100 text-2xl">My Ratings</Text>
						</View>
					</>
				)}
				ListEmptyComponent={() => (
					<Empty
						title="No Movies Found"
						desc="You haven't rated any movies yet."
						showButton={true}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Ratings;
