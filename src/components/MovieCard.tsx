import { View, Text, Image } from "react-native";
import React from "react";

import { Link } from "expo-router";
import { Recommendation, Result } from "@/lib/types";

type MovieCardProps = {
	movie: Result | Recommendation;
};

const MovieCard = ({ movie }: MovieCardProps) => {
	return (
		<Link href={`/movie/${movie.id}`} className="mr-[6px]">
			<View className="w-[90px] items-center justify-center rounded-lg gap-0.5">
				<Image
					src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
					className="w-[88px] h-36 rounded-lg overflow-hidden"
					resizeMode="cover"
				/>
				<Text className="max-w-[86px] text-[9px] text-white font-interLight">{movie.title}</Text>
			</View>
		</Link>
	);
};

export default MovieCard;
