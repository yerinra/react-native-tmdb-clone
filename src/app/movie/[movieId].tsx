// import { View, Text, FlatList, ImageBackground, Image } from "react-native";
// import React from "react";
// import { useLocalSearchParams } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import HorizontalList from "@/components/HorizontalList";
// import { IMAGE_BASE_URL } from "@/lib/constants";
// import useMovieDetail from "@/hooks/useMovieDetail";

// const Movie = () => {
// 	const { movieId } = useLocalSearchParams();
// 	const numericMovieId = typeof movieId === "string" ? parseInt(movieId, 10) : undefined;

// 	const { movie, castImage, loading } = useMovieDetail(numericMovieId);
// 	console.log(movie);

// 	if (!movie) return <Text>There is no movie of {movieId}</Text>;

// 	return (
// 		<SafeAreaView className="flex-1 bg-primary h-full">
// 			<FlatList
// 				data={[
// 					{ id: "cast", name: "Casts", items: movie.credits.cast },
// 					{ id: "trailer", name: "Trailer", items: movie.videos.results },
// 					{ id: "recommendations", name: "Recommendations", items: movie.recommendations.results },
// 				]}
// 				keyExtractor={(item) => item.id}
// 				renderItem={({ item }) => (
// 					<View className="w-full mt-[280px] flex-1 pl-4">
// 						<View className="flex-row items-center mb-2 ">
// 							<Text className="text-white text-lg font-interSemiBold">{item.name}</Text>
// 						</View>
// 						<View className="">
// 							<HorizontalList type={item.id} movies={item.items ?? []} />
// 						</View>
// 					</View>
// 				)}
// 				ListHeaderComponent={() => (
// 					<ImageBackground
// 						resizeMode="cover"
// 						className="w-full h-[280px] saturate-100"
// 						src={IMAGE_BASE_URL + movie.backdrop_path}
// 					>
// 						<View className="mt-16 mx-4">
// 							<Text className="text-white text-xl font-interBold">{movie.title}</Text>
// 							<View className="flex-row">
// 								<Image
// 									src={IMAGE_BASE_URL + movie.poster_path}
// 									className="w-[88px] h-36 rounded-lg overflow-hidden"
// 									resizeMode="cover"
// 								/>
// 								<View className="">
// 									<View className="flex-row">
// 										<Text>{movie.vote_average.toFixed(1)}</Text>
// 										<Text>{movie.original_language.toUpperCase()}</Text>
// 									</View>
// 									<View>
// 										<Text>Status</Text>
// 										<Text className="text-white">{movie.status}</Text>
// 									</View>
// 									<View>
// 										<Text>Revenue</Text>
// 										<Text className="text-white">{"$" + movie.revenue.toLocaleString()}</Text>
// 									</View>
// 								</View>
// 							</View>
// 							<View>
// 								<Text className="text-text">Original Title</Text>
// 								<Text className="text-white">{movie.original_title}</Text>
// 							</View>
// 							<View>
// 								<Text className="text-text">Overview</Text>
// 								<Text className="text-sm font-interThin text-gray-400 italic">{movie.tagline}</Text>
// 								<Text className="text-white">{movie.overview}</Text>
// 							</View>
// 						</View>
// 						{/* <HorizontalList
// 							movies={movie.recommendations.results.map((item) => {
// 								return {
// 									id: item.id,
// 									poster_path: item.poster_path,
// 									title: item.title,
// 								};
// 							})}
// 						/> */}
// 					</ImageBackground>
// 				)}
// 			/>

// 			{/* <View className="absolute top-0 w-full h-[350px] bg-primary/60" /> */}
// 		</SafeAreaView>
// 	);
// };

// export default Movie;
import { View, Text, FlatList, ImageBackground, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalList from "@/components/HorizontalList";
import { IMAGE_BASE_URL } from "@/lib/constants";
import useMovieDetail from "@/hooks/useMovieDetail";

const Movie = () => {
	const { movieId } = useLocalSearchParams();
	const numericMovieId = typeof movieId === "string" ? parseInt(movieId, 10) : undefined;

	const { movie, castImage, loading } = useMovieDetail(numericMovieId);
	console.log(movie);

	if (!movie) return <Text>There is no movie of {movieId}</Text>;

	return (
		<SafeAreaView className="flex-1 bg-primary h-full">
			<ScrollView>
				<ImageBackground
					resizeMode="cover"
					className="w-full h-[280px] saturate-100"
					src={IMAGE_BASE_URL + movie.backdrop_path}
				>
					<View className="mt-16 mx-4">
						<Text className="text-white text-xl font-interBold">{movie.title}</Text>
						<View className="flex-row">
							<Image
								src={IMAGE_BASE_URL + movie.poster_path}
								className="w-[88px] h-36 rounded-lg overflow-hidden"
								resizeMode="cover"
							/>
							<View className="">
								<View className="flex-row">
									<Text>{movie.vote_average.toFixed(1)}</Text>
									<Text>{movie.original_language.toUpperCase()}</Text>
								</View>
								<View>
									<Text>Status</Text>
									<Text className="text-white">{movie.status}</Text>
								</View>
								<View>
									<Text>Revenue</Text>
									<Text className="text-white">{"$" + movie.revenue.toLocaleString()}</Text>
								</View>
							</View>
						</View>
						<View>
							<Text className="text-text">Original Title</Text>
							<Text className="text-white">{movie.original_title}</Text>
						</View>
						<View>
							<Text className="text-text">Overview</Text>
							<Text className="text-sm font-interThin text-gray-400 italic">{movie.tagline}</Text>
							<Text className="text-white">{movie.overview}</Text>
						</View>
					</View>
					{/* <HorizontalList
							movies={movie.recommendations.results.map((item) => {
								return {
									id: item.id,
									poster_path: item.poster_path,
									title: item.title,
								};
							})}
						/> */}
				</ImageBackground>
				<View className="h-[1200px]" />
			</ScrollView>
			{/* <View className="absolute top-0 w-full h-[350px] bg-primary/60" /> */}
		</SafeAreaView>
	);
};

export default Movie;
