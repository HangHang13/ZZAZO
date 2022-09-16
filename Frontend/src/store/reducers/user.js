import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: {
			isLogin: false,
			data: null,
		},
	},
	reducers: {
		storeLogin: (state, action) => {
			state.value = action.payload;
		},
		storeLogout: (state, action) => {
			state.value = {
				isLogin: false,
				data: null,
			};
		},
	},
});

export const { storeLogin } = userSlice.actions;
export default userSlice.reducer;
