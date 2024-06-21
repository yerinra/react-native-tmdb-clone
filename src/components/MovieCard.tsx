import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieCard = ({ movie }) => {
	return (
		<View className="mr-[6px]">
			<View className="w-[90px] items-center justify-center rounded-lg gap-0.5">
				<Image
					src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
					className="w-[88px] h-36 rounded-lg overflow-hidden"
					resizeMode="cover"
				/>
				<Text className="max-w-[86px] text-[9px] text-white font-interLight">{movie.title}</Text>
			</View>
		</View>
	);
};

export default MovieCard;
