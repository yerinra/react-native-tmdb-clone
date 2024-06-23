import { useState, useEffect } from "react";
import { searchByKeyword } from "@/lib/tmdb";
import { Result } from "@/lib/types";

const useSearchResult = (keyword: string, initialPage: number = 1) => {
	const [data, setData] = useState<Result[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(initialPage);

	const fetchMovieList = async (page: number) => {
		try {
			setLoading(true);
			const result = await searchByKeyword(keyword, page);
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

	const reset = () => {
		setCurrentPage(1);
	};

	return { data, loading, loadMore, reset };
};

export default useSearchResult;
