import { Text, TouchableOpacity } from "react-native";
import React from "react";

type CustomButtonProps = {
	title: string;
	handlePress: () => void;
	isLoading: boolean;
	containerStyles?: string;
	textStyles?: string;
};

const CustomButton = ({
	title,
	handlePress,
	isLoading,
	containerStyles,
	textStyles,
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
			disabled={isLoading}
		>
			<Text className={`text-primary font-interSemiBold text-md ${textStyles}`}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
