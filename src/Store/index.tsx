import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "./reducers/UsersReducer";

const config = {
  key: "BEAUTY",
  version: 1,
  storage,
};

export default legacy_createStore(
  persistReducer(config, combineReducers({ User })),
);
