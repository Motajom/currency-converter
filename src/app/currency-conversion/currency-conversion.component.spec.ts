import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConversionComponent } from './currency-conversion.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { convertCurrency } from '../state/currency.actions';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('CurrencyConversionComponent', () => {
  let component: CurrencyConversionComponent;
  let fixture: ComponentFixture<CurrencyConversionComponent>;
  let store: MockStore<{ currency: { convertedAmount: number; error: string } }>;

  const initialState = {
    currency: {
      sourceCurrency: '',
      destinationCurrency: '',
      amount: 0,
      convertedAmount: 0,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyConversionComponent],
      imports: [StoreModule.forRoot({}), ReactiveFormsModule],
      providers: [FormBuilder, provideMockStore({initialState})],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyConversionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<{ currency: { convertedAmount: number; error: string } }>;
  });

  it('should initialize the form with default values', () => {
    expect(component.currencyForm.get('sourceCurrency')?.value).toEqual('USD');
    expect(component.currencyForm.get('amount')?.value).toEqual(0);
    expect(component.currencyForm.get('destinationCurrency')?.value).toEqual('EUR');
  });

  it('should dispatch convertCurrency action with correct parameters', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.currencyForm.patchValue({
      sourceCurrency: 'USD',
      amount: 100,
      destinationCurrency: 'EUR',
    });

    component.convertCurrency();

    expect(dispatchSpy).toHaveBeenCalledWith(
      convertCurrency({
        sourceCurrency: 'USD',
        amount: 100,
        destinationCurrency: 'EUR'
      })
    );
  });

  it('should update convertedAmount and errorMessage when store emits a new state', () => {
    const convertedAmount = 20;
    const error = 'An error occurred';

    store.setState({
      currency: {
        convertedAmount,
        error,
      },
    });

    component.convertCurrency();

    expect(component.convertedAmount).toEqual(convertedAmount);
    expect(component.errorMessage).toEqual(error);
  });
});
