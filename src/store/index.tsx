import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminProfileSlice from "./utils/adminProfileSlice";

const persistConfig = {
  key: "beauty",
  version: 1,
  storage,
  whitelist: ["admin"],
};

const rootReducer = combineReducers({
  admin: adminProfileSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { persistor, store, type AppDispatch, type RootState };
