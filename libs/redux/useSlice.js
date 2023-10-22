import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  pp: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    serUsername: (state, action) => {
      console.log("woylah");
      state.username = action.payload;
    },
    setpp: (state, action) => {
      state.pp = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, setpp } = userSlice.actions;

export default userSlice.reducer;
