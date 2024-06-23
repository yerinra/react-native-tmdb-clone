import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetail, Person } from "@/lib/types";
import { BASE_URL, PERSON_URL } from "@/lib/constants";
import { headers } from "@/lib/tmdb";

const useMovieDetail = (movieId: number) => {
	const [movie, setMovie] = useState<MovieDetail | null>(null);
	const [castImage, setCastImage] = useState<Person[]>([]);
	const [loading, setLoading] = useState(true);

	const getMovieDetail = async () => {
		try {
			const params = {
				language: "en-US",
				append_to_response: "videos,recommendations,credits",
			};

			const response = await axios.get<MovieDetail>(BASE_URL + movieId, { params, headers });
			setMovie(response.data);

			const castIds = response.data.credits.cast.map((member) => member.id);

			await Promise.all(castIds.slice(0, 10).map((id) => fetchCastInfo(id)));
		} catch (error) {
			console.error("Failed to fetch movie detail:", error);
		}
	};

	const fetchCastInfo = async (personId: number) => {
		try {
			const params = {
				language: "en-US",
			};
			const response = await axios.get<Person>(PERSON_URL + personId, { params, headers });
			setCastImage((prevCast) => [...prevCast, response.data]);
		} catch (error) {
			console.error("Failed to fetch cast info:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			await getMovieDetail();
			setLoading(false);
		};

		fetchData();
	}, [movieId]);

	return { movie, castImage, loading };
};

export default useMovieDetail;
