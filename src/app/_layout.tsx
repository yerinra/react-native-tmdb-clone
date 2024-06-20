import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
		"Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
		"Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
		"Inter-ExtraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
		"Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
		"Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
		"Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
		"Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Thin": require("../../assets/fonts/Inter-Thin.ttf"),
	});

	useEffect(() => {
		if (error) throw Error;
		if (!fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded && !error) return null;

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
};

export default RootLayout;