import { configureStore } from "@reduxjs/toolkit";

import currenciesReducer from "./slice/currenciesSlice";
import exchangeReducer from "./slice/exchangeSlice";
import defaultExchangeReducer from "./slice/defaultExchangeSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    exchange: exchangeReducer,
    defaultExchange: defaultExchangeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
