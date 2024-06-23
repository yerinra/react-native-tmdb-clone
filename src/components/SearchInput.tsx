import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

type SearchInputProps = {
	initialQuery: string;
};

const SearchInput = ({ initialQuery }: SearchInputProps) => {
	const [query, setQuery] = useState(initialQuery || "");
	const pathname = usePathname();

	useEffect(() => {
		if (pathname == "/home") setQuery("");
	}, [pathname]);

	return (
		<View
			className={
				"flex-row border-2 border-[#060b17] w-[90vw] h-16 px-4 bg-[#060b17] rounded-2xl focus:border-secondary items-center space-x-4 mt-4"
			}
		>
			<TextInput
				className="text-sm mt-0.5 flex-1 text-white font-interLight"
				value={query}
				placeholder="Search for a movie."
				placeholderTextColor="#7b7b8b"
				onChangeText={(e) => setQuery(e)}
			/>
			<TouchableOpacity
				onPress={() => {
					if (query === "")
						return Alert.alert(
							"Missing Query",
							"Please input something to search results across database",
						);

					router.push(`/search/${query}`);
				}}
			>
				<Octicons name="search" color={"#E0E2E1"} size={22} />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
