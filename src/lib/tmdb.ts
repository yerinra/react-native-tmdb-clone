import axios from "axios";
import { BASE_URL, PERSON_URL, SEARCH_URL } from "./constants";
import type { ListType } from "./types";

const TMDB_API_KEY = "ccd40ae65637cda820311171b565af91";

export const headers = {
	accept: "application/json",
	Authorization:
		"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Q0MGFlNjU2MzdjZGE4MjAzMTExNzFiNTY1YWY5MSIsInN1YiI6IjY2NzUzMWFlOTQwMGU3NmExYzZjNzgzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aw25tHUNHu55thGrhHaw45VrtpqRPlIF3Q2njSKcRJw",
};

// 키워드로 검색하기
export const searchByKeyword = async (keyword: string, page = 1) => {
	const params = {
		query: keyword,
		include_adult: false,
		language: "en-US",
		page,
	};

	const response = await axios.get(SEARCH_URL, { params, headers });
	return response.data.results;
};

// 홈 화면의 영화 리스트 받아오기
export const getMovieList = async (type: ListType, page = 1) => {
	const params = {
		language: "en-US",
		page,
	};
	const response = await axios.get(BASE_URL + type, { params, headers });

	return response.data.results;
};

// 영화 상세 정보(크레딧, 트레일러, 추천 영화 목록 append 해서 받아오기)
export const getMovieDetail = async (movieId: number) => {
	const params = {
		language: "en-US",
		append_to_response: "credits,videos,recommendations",
	};

	const response = await axios.get(BASE_URL + movieId, { params, headers });
	return response.data;
};
