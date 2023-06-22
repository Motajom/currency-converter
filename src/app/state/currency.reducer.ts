import { createReducer, on } from '@ngrx/store';
import * as CurrencyActions from './currency.actions';

export interface CurrencyState {
  convertedAmount: number | null;
  error: string | null;
}

export const initialState: CurrencyState = {
  convertedAmount: null,
  error: null,
};

export const currencyReducer = createReducer(
  initialState,
  on(CurrencyActions.convertCurrency, (state) => ({
    ...state,
    convertedAmount: null,
    error: null,
  })),
  on(CurrencyActions.convertCurrencySuccess, (state, { convertedAmount }) => ({
    ...state,
    convertedAmount,
    error: null,
  })),
  on(CurrencyActions.convertCurrencyFailure, (state, { error }) => ({
    ...state,
    convertedAmount: null,
    error,
  }))
);

