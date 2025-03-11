import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/slice/productsSlice";
import insurancePlansReducer from "./redux/slice/insurancePlansSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    insurancePlans: insurancePlansReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
