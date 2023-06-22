import { createAction, props } from '@ngrx/store';

export const convertCurrency = createAction(
  '[Currency] Convert Currency',
  props<{ sourceCurrency: string; amount: number; destinationCurrency: string }>()
);

export const convertCurrencySuccess = createAction(
  '[Currency] Convert Currency Success',
  props<{ convertedAmount: number }>()
);

export const convertCurrencyFailure = createAction(
  '[Currency] Convert Currency Failure',
  props<{ error: string }>()
);
