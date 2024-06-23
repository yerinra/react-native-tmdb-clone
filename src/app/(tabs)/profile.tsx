import { Alert, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { getCurrentUser, signOut } from "@/lib/appwrite";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/slice/userSlice";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
	const dispatch = useAppDispatch();

	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState("");
	useEffect(() => {
		const getUserName = async () => {
			const result = await getCurrentUser();
			setUserName(result.username);
			setAvatar(result.avatar);
		};

		getUserName();
	}, []);

	const handlePress = async () => {
		try {
			await signOut();
			dispatch(clearUser());
			router.replace("/");
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[90vh] px-4 my-6">
					<Text className="text-white text-lg font-interSemiBold">Profile</Text>
					<Text>{userName}</Text>

					<CustomButton title="Sign Out" handlePress={handlePress} isLoading={false}></CustomButton>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
