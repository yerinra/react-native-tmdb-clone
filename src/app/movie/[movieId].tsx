import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalList from "@/components/HorizontalList";
import { IMAGE_BASE_URL } from "@/lib/constants";
import Rating from "@/components/Rating";
import useFetch from "@/hooks/useFetch";
import { getMovieDetail } from "@/lib/tmdb";
import { MovieDetail } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	addFavorite,
	getCurrentUser,
	getUserFavoriteForMovie,
	getUserRatingForMovie,
	removeFavorite,
	updateRating,
} from "@/lib/appwrite";

const Movie = () => {
	const { movieId } = useLocalSearchParams();
	const numericMovieId = typeof movieId === "string" ? parseInt(movieId, 10) : undefined;
	const [isFavorite, setIsFavorite] = useState(false);

	const {
		data: movie,
		loading,
		refetch,
	} = useFetch<MovieDetail>(() => getMovieDetail(numericMovieId as number));

	useEffect(() => {
		const fetchUserRatingAndFavorite = async () => {
			try {
				const user = await getCurrentUser();
				const userId = user.$id;

				// Fetch user rating
				const userRating = await getUserRatingForMovie(userId, numericMovieId as number);
				if (userRating) {
					setRating(userRating.rating);
				}

				// Fetch user favorite
				const userFavorite = await getUserFavoriteForMovie(userId, numericMovieId as number);
				if (userFavorite) {
					setIsFavorite(true);
				} else {
					setIsFavorite(false);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		if (numericMovieId) {
			fetchUserRatingAndFavorite();
		}
	}, [numericMovieId]);

	const [rating, setRating] = useState(0);

	if (loading) return <Text>Loading...</Text>;
	if (!movie) return <Text>There is no movie of {movieId}</Text>;

	const handleRatingChange = async (newRating: number) => {
		try {
			const user = await getCurrentUser();
			console.log("User object:", user); // 로그 추가
			const userId = user.$id; // user.$id를 사용
			setRating(newRating);
			await updateRating(userId, movie, newRating);
		} catch (error: any) {
			console.error("Error handling rating change:", error);
		}
	};

	const handleToggleFavorite = async () => {
		try {
			const user = await getCurrentUser();
			const userId = user.$id;

			if (isFavorite) {
				await removeFavorite(userId, numericMovieId as number);
				setIsFavorite(false);
			} else {
				await addFavorite(userId, movie);
				setIsFavorite(true);
			}
		} catch (error: any) {
			console.error("Error toggling favorite:", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-primary h-full">
			<ScrollView>
				<ImageBackground
					resizeMode="cover"
					className="w-full h-[280px] saturate-100"
					src={IMAGE_BASE_URL + movie.backdrop_path}
				>
					<View className="mt-28 mx-4">
						<Text className="text-white text-2xl font-interBold">{movie.title}</Text>
						<View className="flex-row gap-x-3 gap-y-2 mt-1">
							<Image
								src={IMAGE_BASE_URL + movie.poster_path}
								className="w-[150px] h-52 rounded-lg overflow-hidden"
								resizeMode="cover"
							/>

							<View className="justify-center gap-y-1">
								<View className="flex-row gap-x-2">
									<Text
										className={`font-interMedium text-white p-2 rounded-full ${movie.vote_average < 7 ? "bg-orange-500/70" : "bg-green-700/70"}`}
									>
										{movie.vote_average.toFixed(1)}
									</Text>
									<Text className="font-interMedium text-white p-2 bg-green-700/70">
										{movie.original_language.toUpperCase()}
									</Text>
								</View>
								<View className="gap-0.5">
									<Text className="text-xs text-text font-interRegular">Status</Text>
									<Text className="font-interMedium text-white">{movie.status}</Text>
								</View>
								<View className="gap-0.5">
									<Text className="text-xs text-text font-interRegular">Revenue</Text>
									<Text className="font-interMedium text-white">
										{"$" + movie.revenue.toLocaleString()}
									</Text>
								</View>
								<Rating rating={rating} onRatingChange={handleRatingChange} />
								<TouchableOpacity
									className={`mt-1 px-2 py-1 rounded-lg items-center ${isFavorite ? "bg-gray-600" : "bg-secondary"}`}
									onPress={handleToggleFavorite}
								>
									<Text className="text-white">
										{isFavorite ? "Remove from Favorites" : "Add to Favorites"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View className="my-2">
							<View className="mb-4 gap-0.5 pt-1">
								<Text className="text-white/70 text-xs font-interMedium">Original Title</Text>
								<Text className="text-sm text-text">{movie.original_title}</Text>
							</View>
							<View className="mb-2 gap-y-1">
								<Text className="text-text text-md font-interMedium">Overview</Text>
								<Text className="text-xs font-interRegular text-white/50">{movie.tagline}</Text>
								<Text className="text-xs text-white font-interLight">{movie.overview}</Text>
							</View>
						</View>
						<Text className="text-white font-interMedium mb-2">Trailers</Text>
						<HorizontalList
							type="trailer"
							movies={movie.videos.results.map((item) => {
								return {
									id: item.id,
									key: item.key,
								};
							})}
						/>
						<Text className="text-white font-interMedium mb-2">Casts</Text>
						<HorizontalList
							type="cast"
							movies={movie.credits.cast.map((person) => {
								return {
									id: person.id,
									profile_path: person.profile_path,
									character: person.character,
									name: person.name,
								};
							})}
						/>
						<Text className="text-white font-interMedium mb-2">Recommendations</Text>
						<HorizontalList
							type="default"
							movies={movie.recommendations.results.map((item) => {
								return {
									id: item.id,
									poster_path: item.poster_path,
									title: item.title,
								};
							})}
						/>
					</View>
				</ImageBackground>
				<View className="h-[1200px]" />
			</ScrollView>
			{/* <View className="absolute top-0 w-full h-[350px] bg-primary/60" /> */}
		</SafeAreaView>
	);
};

export default Movie;
