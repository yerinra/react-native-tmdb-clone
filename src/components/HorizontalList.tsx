import { FlatList, View } from "react-native";
import React from "react";
import MovieCard from "./MovieCard";
import { Result } from "@/lib/tmdb";
import BackdropMovieCard from "./BackdropMovieCard";

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
