import axios from "axios";
import { BASE_URL, SEARCH_URL } from "./constants";
import { ListType, MovieListResponse } from "./types";

const TMDB_API_KEY = "ccd40ae65637cda820311171b565af91";

const headers = {
	accept: "application/json",
	Authorization:
		"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q0MGFlNjU2MzdjZGE4MjAzMTExNzFiNTY1YWY5MSIsInN1YiI6IjY2NzUzMWFlOTQwMGU3NmExYzZjNzgzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aw25tHUNHu55thGrhHaw45VrtpqRPlIF3Q2njSKcRJw",
};

export const searchByKeyword = async (keyword: string, page = 1): Promise<MovieListResponse> => {
	const params = {
		query: keyword,
		include_adult: false,
		language: "en-US",
		page,
	};

	const response = await axios.get(SEARCH_URL, { params, headers });
	return response.data.results;
};

export const getMovieList = async (type: ListType, page = 1) => {
	const params = {
		language: "en-US",
		page,
	};
	const response = await axios.get(BASE_URL + type, { params, headers });

	return response.data.results;
};

export const getMovieDetail = async (movieId: number) => {
	const params = {
		language: "en-US",
	};

	const response = await axios.get(BASE_URL + movieId, { params, headers });
	return response.data;
};
