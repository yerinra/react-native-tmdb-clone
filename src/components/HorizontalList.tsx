import { FlatList, Text, View } from "react-native";
import React from "react";
import MovieCard from "./MovieCard";
import BackdropMovieCard from "./BackdropMovieCard";
import CastCard from "./CastCard";
import TrailerCard from "./TrailerCard";

type HorizontalListProps = {
	movies: any[];
	type: "backdrop" | "trailer" | "cast" | "default" | "recommendations";
};

const HorizontalList = ({ movies, type }: HorizontalListProps) => {
	const renderItem = ({ item }: { item: any }) => {
		switch (type) {
			case "backdrop":
				return <BackdropMovieCard movie={item} />;
			case "trailer":
				return <TrailerCard video={item} />;
			case "cast":
				return <CastCard cast={item} />;
			case "default":
			case "recommendations":
			default:
				return <MovieCard movie={item} />;
		}
	};

	return (
		<View>
			<FlatList
				data={movies}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderItem}
				horizontal
			/>
		</View>
	);
};

export default HorizontalList;
