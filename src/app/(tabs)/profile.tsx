import { Alert, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/slice/userSlice";
import { Link, router } from "expo-router";

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
		<View>
			<Text>Profile</Text>
			<Text>{user?.$createdAt}</Text>

			<Link href="/sign-in">로긴</Link>
			<CustomButton title="Sign Out" handlePress={handlePress} isLoading={false}></CustomButton>
		</View>
	);
};

export default Profile;
