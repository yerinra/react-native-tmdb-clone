import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

type SearchInputProps = {
	title: string;
	value: string;
	placeholder?: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?: "email-address";
};

const SearchInput = ({
	title,
	value,
	handleChangeText,
	placeholder,
	...props
}: SearchInputProps) => {
	return (
		<View
			className={
				"flex-row border-2 border-[#060b17] w-full h-16 px-4 bg-[#060b17] rounded-2xl focus:border-secondary items-center space-x-4 mt-4"
			}
		>
			<TextInput
				className="text-base mt-0.5 flex-1 text-white font-interRegular"
				value={value}
				placeholder={placeholder}
				placeholderTextColor="#7b7b8b"
				onChangeText={handleChangeText}
				secureTextEntry={title === "Password"}
			/>
			<TouchableOpacity>
				<Octicons name="search" color={"#E0E2E1"} size={22} />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
