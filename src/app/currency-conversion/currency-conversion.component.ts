import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { convertCurrency } from '../state/currency.actions';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent {
  // initialize variables
  errorMessage = '';
  currencyForm: FormGroup;
  currencies = ['USD', 'EUR', 'GBP']; // sample currencies
  sourceCurrency: string = '';
  amount: number = 0;
  destinationCurrency: string = '';
  convertedAmount: null | number = null;

  constructor(private formBuilder: FormBuilder, public store: Store<{ currency: { convertedAmount: number; error: string } }>) {
    this.currencyForm = this.formBuilder.group({
      sourceCurrency: ['USD', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      destinationCurrency: ['EUR', Validators.required]
    });
  }



  convertCurrency() {
    this.errorMessage = ''; // reset error message
    if (this.currencyForm.valid) {
      const { sourceCurrency, destinationCurrency, amount } = this.currencyForm.value;
      this.store.dispatch( // dispatch store action
      convertCurrency({
        sourceCurrency,
        amount,
        destinationCurrency
      })
    );

    // subscribe to state change for currency store
    this.store.select('currency').subscribe((state) => {
      this.convertedAmount = state.convertedAmount;
      this.errorMessage = state.error;
    });
  }
}}
