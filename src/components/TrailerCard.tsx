import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React from "react";
import { Video } from "@/lib/types";
import play from "../../assets/play.png";

type TrailerCardProps = {
	video: Video;
};

const TrailerCard = ({ video }: TrailerCardProps) => {
	const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

	const handleOpenYoutubeApp = () => {
		const url = `vnd.youtube://${video.key}`;
		Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
	};

	return (
		<View className="w-[260px] items-center justify-start rounded-lg mr-2">
			<TouchableOpacity onPress={handleOpenYoutubeApp}>
				<Image
					source={{ uri: thumbnailUrl }}
					className="w-[260px] h-36 rounded-lg overflow-hidden"
					resizeMode="cover"
				/>
				<Image
					source={play}
					className="w-12 h-12 absolute top-12 left-[106px]"
					resizeMode="contain"
				/>
			</TouchableOpacity>
			<Text className="max-w-[86px] mt-1 text-xs text-white font-interMedium">{video.name}</Text>
		</View>
	);
};

export default TrailerCard;
