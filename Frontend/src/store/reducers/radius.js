import { createSlice } from "@reduxjs/toolkit";

export const radiusSlice = createSlice({
	name: "radius",
	initialState: {
		value: 0,
	},
	reducers: {
		storeSetRadius: (state, action) => {
			state.value = action.payload;
		},
		storeGetRadius: (state, action) => {
			return state.value;
		},
	},
});

export const { storeSetRadius, storeGetRadius } = radiusSlice.actions;
export default radiusSlice.reducer;
