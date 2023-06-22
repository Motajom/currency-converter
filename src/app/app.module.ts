import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MockApiService} from "./mock-api.service";
import {ErrorComponent} from "./error/error.component";
import {StoreModule} from "@ngrx/store";
import {currencyReducer} from "./state/currency.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CurrencyEffects} from "./state/currency.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment.prod";

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConversionComponent,
    ErrorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
      StoreModule.forRoot({ currency: currencyReducer }),
      EffectsModule.forRoot([CurrencyEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      }),
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
