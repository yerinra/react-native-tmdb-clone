import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { Result } from "@/lib/types";
import { IMAGE_BASE_URL } from "@/lib/constants";
import { Link } from "expo-router";

type BackdropMovieCardProps = {
	movie: Result;
};

const BackdropMovieCard = ({ movie }: BackdropMovieCardProps) => {
	return (
		<Link href={`/movie/${movie.id}`} className="mr-2">
			<ImageBackground
				resizeMode="cover"
				className="w-[200px] h-52 rounded-lg overflow-hidden"
				src={IMAGE_BASE_URL + movie.backdrop_path}
			>
				<View className="w-full flex-row flex-1  items-end rounded-lg ">
					<Image
						src={IMAGE_BASE_URL + movie.poster_path}
						className="w-10 h-[66px] rounded-lg overflow-hidden shadow-lg m-1"
						resizeMode="cover"
					/>
					<View className="bg-black/40 mb-1 p-1 rounded-lg">
						<Text className="max-w-40 text-[11px] h-[20px] text-white font-interMedium">
							{movie.title}
						</Text>
						<Text className="w-34 h-10 text-[8px] text-white font-interLight">
							{movie.overview}
						</Text>
					</View>
				</View>
			</ImageBackground>
		</Link>
	);
};

export default BackdropMovieCard;
