import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { getCurrentUser, signOut } from "@/lib/appwrite";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/slice/userSlice";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

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
				<View className="w-full justify-center px-4 my-6 h-full">
					<Text className=" text-gray-100 text-2xl">My Profile</Text>

					<View className="flex-row items-center gap-x-4 mb-10 mt-10">
						<Image src={user && user.avatar} className="w-14 h-14 rounded-full" />
						<Text className="text-white text-2xl font-interSemiBold">{user && user.username}</Text>
					</View>

					<CustomButton title="Sign Out" handlePress={handlePress} isLoading={false}></CustomButton>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
