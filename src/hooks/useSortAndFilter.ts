import { useState, useMemo } from "react";

type SortOptions = "release_date" | "popularity" | "rating" | "updated_at" | "title";

const SORT_OPTIONS = [
	{ id: "release_date", label: "Release Date" },
	{ id: "popularity", label: "Popularity" },
	{ id: "rating", label: "Rating" },
	{ id: "updated_at", label: "Rated At" },
	{ id: "title", label: "Title" },
];

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
			sortedData.sort((a, b) => a.title.localeCompare(b.title));
			break;
		default:
			break;
	}
	return sortedData;
};

const useSortAndFilter = (data: any[], favoritesData: any[]) => {
	const [sortBy, setSortBy] = useState<SortOptions>("release_date");
	const [showFilteredOnly, setShowFilteredOnly] = useState(false);

	const filteredData = (isFavoriteFilter: boolean) => {
		if (!data || !favoritesData) return [];

		let filtered = [...data];
		if (isFavoriteFilter) {
			filtered = filtered.filter((item) =>
				favoritesData.some((fav) => fav.movieId === item.movieId),
			);
		}

		return filtered;
	};

	const sortedAndFilteredData = useMemo(
		() => (filterCondition: "favorite" | "rating" | null) => {
			if (filterCondition === null) return sortData(sortBy, data);
			const isFavoriteFilter = filterCondition === "favorite";
			const filtered = filteredData(isFavoriteFilter);
			return sortData(sortBy, filtered);
		},
		[sortBy, showFilteredOnly, data, favoritesData],
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
