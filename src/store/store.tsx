import { configureStore } from '@reduxjs/toolkit';

import currenciesReducer from './slice/currenciesSlice';
import exchangeReducer from './slice/exchangeSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    exchange: exchangeReducer,
  },  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;