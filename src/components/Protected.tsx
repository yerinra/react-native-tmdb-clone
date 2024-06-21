import { getCurrentUser } from "@/lib/appwrite";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser, setUser } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";

export const Protected = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const { isLoggedIn, user } = useAppSelector((state) => state.user);

	useEffect(() => {
		getCurrentUser()
			.then((res: Models.Document | undefined) => {
				if (res) {
					dispatch(setUser(res));
				} else {
					dispatch(clearUser());
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

	return <View>{loading ? <Text>loading...</Text> : children}</View>;
};

export default Protected;
