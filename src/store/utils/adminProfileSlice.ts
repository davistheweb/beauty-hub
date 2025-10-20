import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface adminProfileState {
  profile: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
  } | null;
}

const initialState: adminProfileState = {
  profile: null,
};

const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<adminProfileState["profile"]>,
    ) => {
      state.profile = { ...(state.profile ?? {}), ...action.payload };
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile } = adminProfileSlice.actions;
export default adminProfileSlice.reducer;
