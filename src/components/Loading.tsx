import { ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
	return (
		<SafeAreaView className="bg-primary h-full flex justify-center items-center">
			<ActivityIndicator size="large" color="#fff" />
		</SafeAreaView>
	);
};

export default Loading;
