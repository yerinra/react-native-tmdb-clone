import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PRIMARY_COLOR } from "@/lib/constants";

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor={PRIMARY_COLOR} style="dark" />
		</>
	);
};

export default AuthLayout;
