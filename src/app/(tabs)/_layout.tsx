import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "@/lib/constants";

type TabIconProps = {
	icon: keyof typeof Octicons.glyphMap;
	color: string;
};

const TabIcon = ({ icon, color }: TabIconProps) => {
	return (
		<View className="items-center justify-center gap-2">
			<Octicons name={icon} color={color} size={22} />
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: SECONDARY_COLOR,
					tabBarInactiveTintColor: "#E0E2E1",
					tabBarStyle: {
						backgroundColor: PRIMARY_COLOR,
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 54,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color }) => <TabIcon icon="home" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="favorites"
					options={{
						title: "Favorites",
						headerShown: false,
						tabBarIcon: ({ color }) => <TabIcon icon="heart" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="ratings"
					options={{
						title: "Ratings",
						headerShown: false,
						tabBarIcon: ({ color }) => <TabIcon icon="feed-star" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color }) => <TabIcon icon="person" color={color} />,
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
