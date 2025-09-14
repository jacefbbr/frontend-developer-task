import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TDefaultExchange } from "../../types";

const initialState: TDefaultExchange = {
  currency: "gbp",
  date: new Date().toISOString().split("T")[0],
};

export const defaultExchangeSlice = createSlice({
  name: "defaultExchange",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const { setCurrency, setDate } = defaultExchangeSlice.actions;
export default defaultExchangeSlice.reducer;
