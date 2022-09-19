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
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("persist:root");
      localStorage.removeItem("jwt");
    },
    storeSetUserProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeLogin, storeLogout, storeSetUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
