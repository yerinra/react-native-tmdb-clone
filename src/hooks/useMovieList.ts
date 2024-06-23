import { useState, useEffect } from "react";
import { getMovieList } from "@/lib/tmdb";
import { ListType, Result } from "@/lib/types";

const useMovieList = (listType: ListType, initialPage: number = 1) => {
	const [data, setData] = useState<Result[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(initialPage);

	const fetchMovieList = async (page: number) => {
		try {
			setLoading(true);
			const result = await getMovieList(listType, page);
			setData((prevData) => [...prevData, ...result]);
		} catch (error) {
			console.error("Error fetching movie list:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovieList(currentPage);
	}, [currentPage]);

	const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

	return { data, loading, loadMore };
};

export default useMovieList;
