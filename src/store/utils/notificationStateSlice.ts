import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationState {
  openNotifications: boolean;
}

const initialNotificationState: INotificationState = {
  openNotifications: false,
};

const notificationStateSlice = createSlice({
  name: "notificationState",
  initialState: initialNotificationState,
  reducers: {
    setOpenNotifications: (
      state,
      action: PayloadAction<INotificationState["openNotifications"]>,
    ) => {
      state.openNotifications = action.payload;
    },
  },
});

export const { setOpenNotifications } = notificationStateSlice.actions;

export default notificationStateSlice.reducer;
