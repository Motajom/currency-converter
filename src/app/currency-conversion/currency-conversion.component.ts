import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { convertCurrency } from '../state/currency.actions';


@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent {
  // initialize variables
  errorMessage = '';
  currencies = ['USD', 'EUR', 'GBP']; // sample currencies
  sourceCurrency: string = '';
  amount: number = 0;
  destinationCurrency: string = '';
  convertedAmount: null | number = null;

  constructor(public store: Store<{ currency: { convertedAmount: number; error: string } }>) {}

  convertCurrency() {
    this.errorMessage = ''; // reset error message
    this.store.dispatch( // dispatch store action
      convertCurrency({
        sourceCurrency: this.sourceCurrency,
        amount: this.amount,
        destinationCurrency: this.destinationCurrency,
      })
    );

    // subscribe to state change for currency store
    this.store.select('currency').subscribe((state) => {
      this.convertedAmount = state.convertedAmount;
      this.errorMessage = state.error;
    });
  }
}
