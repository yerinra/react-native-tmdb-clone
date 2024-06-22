import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "../redux/store";

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
		<Provider store={store}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				{/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
				<Stack.Screen name="curated/[options]" />
				<Stack.Screen
					name="movie/[movieId]"
					options={{
						headerTransparent: true,
						headerStyle: {
							backgroundColor: "rgba(11, 16, 31, 0.9)",
						},
						headerTintColor: "white",
						headerTitle: "",
					}}
				/>
			</Stack>
		</Provider>
	);
};

export default RootLayout;
