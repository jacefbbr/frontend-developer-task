import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Tdata } from "../../types";

const initialState: Tdata = {};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrencies: (_state, action: PayloadAction<Tdata>) => {
      return action.payload
    }
  },
});

export const { setCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;