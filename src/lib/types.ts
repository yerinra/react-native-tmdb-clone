export type ListType = "popular" | "now_playing" | "top_rated" | "upcoming";

export type Result = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: false;
	vote_average: number;
	vote_count: number;
};

export type MovieListResponse = {
	total_pages: number;
	total_results: number;
	results: Result[];
	page: number;
};
type Genre = {
	id: number;
	name: string;
};

type ProductionCompany = {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
};

type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

type SpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

type BelongsToCollection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
};

export type MovieDetail = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	recommendations: Recommendation;
	credits: Credits;
	videos: Videos;
};

type Recommendation = {
	page: number;
	results: {
		backdrop_path: string;
		id: number;
		original_title: string;
		overview: string;
		poster_path: string;
		media_type: string;
		adult: boolean;
		title: string;
		original_language: string;
		genre_ids: number[];
		popularity: number;
		release_date: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	}[];
	total_pages: number;
	total_results: number;
};
type Credits = {
	cast: Cast[];
};

type Cast = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};
type Videos = {
	results: Video[];
};
type Video = {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
};
