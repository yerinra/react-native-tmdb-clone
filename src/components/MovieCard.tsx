import { View, Text, Image } from "react-native";
import React from "react";

import { Link } from "expo-router";
import { Recommendation, Result } from "@/lib/types";

type MovieCardProps = {
	movie: Result | Recommendation;
	search?: boolean;
};

const MovieCard = ({ movie, search }: MovieCardProps) => {
	return (
		<Link href={`/movie/${movie.id}`} className="mr-[6px]">
			<View
				className={`${search ? "w-[83px]" : "w-[90px]"} items-center justify-center rounded-lg gap-0.5`}
			>
				{movie.poster_path ? (
					<Image
						src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
						className={`${search ? "w-[83px]" : "w-[88px]"} h-36 rounded-lg overflow-hidden`}
						resizeMode="cover"
					/>
				) : (
					<View
						className={`${search ? "w-[83px]" : "w-[88px]"} h-36 rounded-lg overflow-hidden border border-white`}
					>
						<Text className="text-white font-interExtraLight text-center">No image</Text>
					</View>
				)}
				{!search && (
					<Text className="max-w-[86px] text-[9px] text-white font-interLight">{movie.title}</Text>
				)}
			</View>
		</Link>
	);
};

export default MovieCard;
