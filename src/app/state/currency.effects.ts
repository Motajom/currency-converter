import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {HttpClient, HttpParams} from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as CurrencyActions from './currency.actions';
import {environment} from "../../environments/environment";

@Injectable()
export class CurrencyEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  convertCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.convertCurrency),
      switchMap(({ sourceCurrency, amount, destinationCurrency }) => {
        const params = new HttpParams()
          .set('access_key', environment.FIXER_API_KEY)
          .set('from', sourceCurrency)
          .set('to', destinationCurrency)
          .set('amount', amount);
        const url = `http://data.fixer.io/api/convert`;

        return this.http.get(url, {params}).pipe(
          map((response: any) => {
            if (response.success) {
              return CurrencyActions.convertCurrencySuccess({ convertedAmount: response.result });
            } else {
              return CurrencyActions.convertCurrencyFailure({ error: response.error.info });
            }
          })
        );
      })
    )
  );

}
