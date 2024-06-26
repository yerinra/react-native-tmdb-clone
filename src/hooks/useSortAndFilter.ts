import { SortOptions } from "@/lib/types";
import { useMemo, useState } from "react";

const useSortAndFilter = (data: any[] | null, filterTargetData: any[] | null) => {
	const [sortBy, setSortBy] = useState<SortOptions>("release_date");
	const [showFilteredOnly, setShowFilteredOnly] = useState(false);

	// 영화 개봉일, 인기도, 내 평점, 평가/즐겨찾기 한 날짜, 제목 순 정렬하는 함수
	const sortData = (sortBy: SortOptions, data: any[]) => {
		if (!data) return [];

		let sortedData = [...data];

		switch (sortBy) {
			case "release_date":
				sortedData.sort(
					(a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
				);
				break;
			case "popularity":
				sortedData.sort((a, b) => b.popularity - a.popularity);
				break;
			case "rating":
				sortedData.sort((a, b) => b.rating - a.rating);
				break;
			case "updated_at":
				sortedData.sort(
					(a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
				);
				break;
			case "title":
				sortedData.sort((a, b) => {
					if (a.title < b.title) return -1;
					if (a.title > b.title) return 1;
					return 0;
				});
				break;
			default:
				break;
		}
		return sortedData;
	};

	const filteredData = (selectedFilter: boolean) => {
		if (!data || !filterTargetData) return [];

		let filtered = [...data];

		if (selectedFilter) {
			filtered = filtered.filter((item) =>
				filterTargetData.some((fav) => fav.movieId === item.movieId),
			);
		}
		return filtered;
	};

	const sortedAndFilteredData = useMemo(
		() => (filterCondition: "favorite" | "rating" | null) => {
			if (filterCondition === null) return sortData(sortBy, data);

			const isFavoriteFilter = filterCondition === "favorite";

			const filtered =
				filterCondition === "favorite"
					? filteredData(isFavoriteFilter)
					: filteredData(filterCondition === "rating");
			return sortData(sortBy, filtered);
		},
		[sortBy, showFilteredOnly, data, filterTargetData],
	);

	return {
		sortBy,
		setSortBy,
		showFilteredOnly,
		setShowFilteredOnly,
		sortedAndFilteredData,
	};
};

export default useSortAndFilter;
