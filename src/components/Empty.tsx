import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type EmptyProps = {
	title: string;
	desc: string;
	showButton: boolean;
};

const Empty = ({ title, desc, showButton }: EmptyProps) => {
	return (
		<View className="justify-center items-center px-4 h-[75vh]">
			<Text className="text-xl text-center font-interSemiBold text-white mt-2">{title}</Text>
			<Text className="text-sm text-text font-interMedium">{desc}</Text>
			{showButton && (
				<CustomButton
					isLoading={false}
					title="Explore Movies"
					handlePress={() => router.push("/home")}
					containerStyles="w-full my-5 mt-10"
				/>
			)}
		</View>
	);
};

export default Empty;
