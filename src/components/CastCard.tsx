import { View, Text, Image } from "react-native";
import React from "react";
import { Cast } from "@/lib/types";

type CastCardProps = {
	cast: any;
};

const CastCard = ({ cast }: CastCardProps) => {
	return (
		<View className="w-[90px] items-center justify-start rounded-lg mr-2">
			<Image
				src={"https://image.tmdb.org/t/p/w300/" + cast.profile_path}
				className="w-[88px] h-36 rounded-lg overflow-hidden"
				resizeMode="cover"
			/>
			<Text className="max-w-[86px] mt-1 text-xs text-white font-interMedium">{cast.name}</Text>
			<Text className="max-w-[86px] text-[9px] text-white font-interLight">{cast.character}</Text>
		</View>
	);
};

export default CastCard;
