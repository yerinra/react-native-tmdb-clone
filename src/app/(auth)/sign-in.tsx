import { View, Text, ScrollView, AppState, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useAppDispatch } from "@/redux/hooks";
import { clearUser, setUser } from "@/redux/slice/userSlice";

const SignIn = () => {
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({ email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (form.email == "" || form.password == "") {
			Alert.alert("Error", "There was an error processing your signup");
		}

		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			if (!result) throw Error;
			dispatch(setUser(result));

			router.replace("/home");
		} catch (error: any) {
			Alert.alert("Error", error.message);
			dispatch(clearUser());
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[90vh] px-4 my-6">
					<Text className="text-4xl font-interBlack text-secondary">TMDB</Text>
					<Text className="text-2xl font-interSemiBold text-white">Sign in to your account.</Text>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
						placeholder=""
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles="mt-7"
						placeholder=""
					/>

					<CustomButton
						title="Sign In"
						handlePress={submit}
						containerStyles="mt-14"
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-text font-interRegular">Don't have account?</Text>
						<Link href="/sign-up" className="text-lg font-interSemiBold text-secondary">
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
