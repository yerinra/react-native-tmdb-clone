import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { MovieDetail, Result } from "@/lib/types";

const useFetch = (fn: () => Promise<Result | MovieDetail>) => {
	const [data, setData] = useState<Result | MovieDetail | []>([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fn();
			setData(res);
		} catch (error: any) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return { data, loading, refetch };
};

export default useFetch;
