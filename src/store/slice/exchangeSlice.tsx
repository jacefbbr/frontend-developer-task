import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Tdata } from "../../types";

const initialState: Tdata = {};

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setExchange: (_state, action: PayloadAction<Tdata>) => {
      return action.payload
    }
  },
});

export const { setExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;