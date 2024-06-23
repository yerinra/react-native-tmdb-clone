import { View, Text, Image } from "react-native";
import React from "react";

import { Link, router } from "expo-router";
import { Recommendation, Result } from "@/lib/types";

type MovieCardProps = {
	movie: Result | Recommendation;
	grid?: boolean;
};

const MovieCard = ({ movie, grid }: MovieCardProps) => {
	return (
		<Link
			key={movie.id}
			href={`/movie/${movie.id}`}
			className="mr-[6px]"
			onPress={() => router.push(`/movie/${movie.id}`)}
		>
			<View
				className={`${grid ? "w-[83px]" : "w-[90px]"} items-center justify-center rounded-lg gap-0.5`}
			>
				{movie.poster_path ? (
					<Image
						src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
						className={`${grid ? "w-[83px]" : "w-[88px]"} h-36 rounded-lg overflow-hidden`}
						resizeMode="cover"
					/>
				) : (
					<View
						className={`${grid ? "w-[83px]" : "w-[88px]"} h-36 rounded-lg overflow-hidden border border-white`}
					>
						<Text className="text-white font-interExtraLight text-center">No image</Text>
					</View>
				)}
				{!grid && (
					<Text className="max-w-[86px] text-[9px] text-white font-interLight">{movie.title}</Text>
				)}
			</View>
		</Link>
	);
};

export default MovieCard;
