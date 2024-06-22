// import { FlatList, View } from "react-native";
// import React from "react";
// import MovieCard from "./MovieCard";

// import BackdropMovieCard from "./BackdropMovieCard";
// import { Cast, Recommendation, Result, Video } from "@/lib/types";

// type HorizontalListProps = {
// 	movies: any[];
// 	type : 'backdrop' | 'trailer' | 'cast' | 'default'
// };

// const HorizontalList = ({ movies, type }: HorizontalListProps) => {
// 	return (
// 		<View>
// 			<FlatList
// 				data={movies}
// 				keyExtractor={(item) => String(item.id)}
// 				renderItem={({ item }) =>
// 					// backdrop ? <BackdropMovieCard movie={item} /> : <MovieCard movie={item} />
// 				{
// 					switch(type) {
// 						case 'default' : <MovieCard movie={item} />;

// 						case ''
// 					}
// 				}
// 				}
// 				horizontal
// 			/>
// 		</View>
// 	);
// };

// export default HorizontalList;

import { FlatList, Text, View } from "react-native";
import React from "react";
import MovieCard from "./MovieCard";
import BackdropMovieCard from "./BackdropMovieCard";
import { Cast, Recommendation, Result, Video } from "@/lib/types";

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
				return <Text className="text-red-500">trailer</Text>;
			case "cast":
				// Implement cast rendering logic
				return <Text className="text-red-500">cast</Text>;
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
