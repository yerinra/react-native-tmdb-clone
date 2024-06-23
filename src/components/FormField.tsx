import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldProps = {
	title: string;
	value: string;
	placeholder?: string;
	handleChangeText: (text: string) => void;
	otherStyles?: string;
	keyboardType?: "email-address";
};

const FormField = ({
	title,
	value,
	handleChangeText,
	placeholder,
	otherStyles,
}: FormFieldProps) => {
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-text font-interMedium">{title}</Text>
			<View className="flex-row border-2 border-[#060b17] w-full h-16 px-4 bg-[#060b17] rounded-2xl focus:border-secondary items-center">
				<TextInput
					className="flex-1 text-white font-interSemiBold text-base"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password"}
				/>
			</View>
		</View>
	);
};

export default FormField;
