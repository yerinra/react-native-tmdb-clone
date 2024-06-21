import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Models } from "react-native-appwrite";

type User = Models.Document | null;
type UserState = {
	isLoggedIn: boolean;
	user: User;
};

const initialState: UserState = {
	isLoggedIn: false,
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		clearUser: (state) => {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
});

// 액션 생성자 추출
export const { setUser, clearUser } = userSlice.actions;

// 리듀서 내보내기
export default userSlice.reducer;
