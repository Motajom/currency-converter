import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConversionComponent } from './currency-conversion.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { convertCurrency } from '../state/currency.actions';

describe('CurrencyConversionComponent', () => {
  let component: CurrencyConversionComponent;
  let fixture: ComponentFixture<CurrencyConversionComponent>;
  let store: MockStore<{ currency: { convertedAmount: number; error: string } }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyConversionComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyConversionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<{ currency: { convertedAmount: number; error: string } }>;
  });

  it('should dispatch convertCurrency action with correct parameters', () => {
    const sourceCurrency = 'USD';
    const amount = 10;
    const destinationCurrency = 'EUR';

    const dispatchSpy = spyOn(store, 'dispatch');

    component.sourceCurrency = sourceCurrency;
    component.amount = amount;
    component.destinationCurrency = destinationCurrency;

    component.convertCurrency();

    expect(dispatchSpy).toHaveBeenCalledWith(
      convertCurrency({
        sourceCurrency,
        amount,
        destinationCurrency,
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
