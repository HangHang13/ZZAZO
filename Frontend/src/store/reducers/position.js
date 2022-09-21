import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
  name: "position",
  initialState: {
    value: {
      data: null,
    },
  },
  reducers: {
    storeSetPosition: (state, action) => {
      state.value = action.payload;
    },
    storeGetPosition: (state, action) => {
      return state.value;
    },
  },
});

export const { storeSetPosition, storeGetPosition } = positionSlice.actions;
export default positionSlice.reducer;
