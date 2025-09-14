import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TCurrencyDefaults } from "../../types";

const initialState: TCurrencyDefaults = ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"];

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setExchange: (_state, action: PayloadAction<TCurrencyDefaults>) => {
      return action.payload
    }
  },
});

export const { setExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;