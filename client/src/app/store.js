import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "../features/links/linkSlice";

export const store = configureStore({
  reducer: {
    links: linksReducer,
  },
});
