import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, signOut } from "@/lib/appwrite";
import { useAppDispatch } from "@/redux/hooks";
import { clearUser, setUser } from "@/redux/slice/userSlice";

const SignUp = () => {
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (form.username.trim() == "" || form.email.trim() == "" || form.password == "") {
			Alert.alert("Error", "There was an error processing your signup");
		}

		setIsSubmitting(true);

		try {
			const res = await createUser(form.email, form.password, form.username);
			dispatch(setUser(res));
			router.replace("/home");
		} catch (error: any) {
			Alert.alert("Error", error.message);
			dispatch(clearUser());
			await signOut();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[90vh] px-4 my-6">
					<Text className="text-4xl font-interBlack text-secondary">TMDB</Text>
					<Text className="text-xl font-interSemiBold text-white">Sign up for an account.</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles="mt-10"
						placeholder=""
					/>
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
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-14"
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-xs text-text font-interRegular">Have an account already?</Text>
						<Link href="/sign-in" className="text-xs font-interSemiBold text-secondary">
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
