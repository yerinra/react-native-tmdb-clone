import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

type RatingProps = {
	rating: number;
	onRatingChange: (newRating: number) => void;
	className?: string;
};

const Rating = ({ rating, onRatingChange, className }: RatingProps) => {
	const handleRating = (newRating: number) => {
		if (rating === newRating) onRatingChange(0);
		else onRatingChange(newRating);
	};

	return (
		<View className={`flex-row gap-0.5 mt-1`}>
			{[...Array(5)].map((_, index) => (
				<TouchableOpacity key={index} onPress={() => handleRating(index + 1)} activeOpacity={0.9}>
					<Octicons name="star-fill" size={22} color={index < rating ? "#FFD700" : "#C0C0C0"} />
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Rating;
