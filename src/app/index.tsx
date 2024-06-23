import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

import { useAppSelector } from "@/redux/hooks";
import { PRIMARY_COLOR } from "@/lib/constants";

export default function App() {
	const { isLoggedIn } = useAppSelector((state) => state.user);

	if (isLoggedIn) return <Redirect href="/home" />;

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
			</ScrollView>
			<StatusBar backgroundColor={PRIMARY_COLOR} style="light" />
		</SafeAreaView>
	);
}
