import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

export default function App() {
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center h-full">
					<Text className="text-5xl text-secondary font-interBlack">THE</Text>
					<Text className="text-5xl text-secondary font-interBlack">MOVIE</Text>
					<Text className="text-5xl text-secondary font-interBlack">DB</Text>
					<Text className="text-white text-sm font-interRegular mt-5 text-center">
						Millions of movies, TV shows
					</Text>
					<Text className="text-white text-sm font-interRegular text-center">
						and people to discover.
					</Text>
					<Text className="text-white text-lg font-interSemiBold mt-3 text-center">
						Explore now.
					</Text>
					<CustomButton
						title="Sign In"
						handlePress={() => {
							router.push("/sign-in");
						}}
						containerStyles="w-11/12 mt-14"
						isLoading={false}
					/>
				</View>
				<TouchableOpacity></TouchableOpacity>
			</ScrollView>
			<StatusBar backgroundColor="#0d253f" style="light" />
		</SafeAreaView>
	);
}
