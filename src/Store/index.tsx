import User from "./reducers/UsersReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";

const config = {
  key: "BEAUTY",
  version: 1,
  storage,
};

export default legacy_createStore(
  persistReducer(config, combineReducers({ User })),
);
