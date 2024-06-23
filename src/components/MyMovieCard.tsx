import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";

import { Link } from "expo-router";
import { IMAGE_BASE_URL } from "@/lib/constants";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type MyMovieCardProps = {
	movie: Models.Document;
	rating: boolean;
};

const MyMovieCard = ({ movie, rating }: MyMovieCardProps) => {
	return (
		<Link href={`/movie/${movie.movieId}`} className="">
			<View className="flex-row justify-center rounded-lg gap-x-3 gap-y-5 max-w-[90vh]">
				{movie.poster_path ? (
					<Image
						src={IMAGE_BASE_URL + movie.poster_path}
						className="w-[88px] h-36 rounded-lg overflow-hidden"
						resizeMode="cover"
					/>
				) : (
					<View className="w-[88px] h-36 rounded-lg overflow-hidden border border-white">
						<Text className="text-white font-interExtraLight text-center">No image</Text>
					</View>
				)}

				<View className="items-start mt-3 w-[240px]">
					<Text className="text-start text-white font-interMedium text-lg">{movie.title}</Text>
					<Text className="text-text font-interRegular text-xs mt-1">
						{movie.release_date.split("-")[0]}
					</Text>
					{rating && (
						<View className="flex-row justify-center gap-x-2 mt-5">
							<Octicons name="star-fill" color="#8acda5" size={18} />

							<Text className="text-secondary font-interSemiBold text-xs">
								{movie.rating.toFixed(1)}
							</Text>
						</View>
					)}
				</View>
			</View>
		</Link>
	);
};

export default MyMovieCard;
