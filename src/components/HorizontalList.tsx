import { FlatList, View } from "react-native";
import React from "react";
import MovieCard from "./MovieCard";

import BackdropMovieCard from "./BackdropMovieCard";
import { Result } from "@/lib/types";

type HorizontalListProps = {
	movies: Result[];
	backdrop?: boolean;
};

const HorizontalList = ({ movies, backdrop }: HorizontalListProps) => {
	return (
		<View>
			<FlatList
				data={movies}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) =>
					backdrop ? <BackdropMovieCard movie={item} /> : <MovieCard movie={item} />
				}
				horizontal
			/>
		</View>
	);
};

export default HorizontalList;
