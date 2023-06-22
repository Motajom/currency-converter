import {Injectable} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockApiService implements HttpInterceptor {

  // create mock json response for currency conversion
  public apiResponse =
    {
      "success": true,
      "query": {
        "from": "GBP",
        "to": "JPY",
        "amount": 25
      },
      "info": {
        "timestamp": 1519328414,
        "rate": 148.972231
      },
      "historical": "",
      "date": "2018-02-22",
      "result": 0

    };

  // error response sample
  public invalidToken = {
    "success": false,
    "error": {
      "code": 101,
      "info": "No API Key was specified or an invalid API Key was specified."
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // intercept http requests
    const {url} = request;

    // check if url matches the one called for conversion
    if (url === 'http://data.fixer.io/api/convert') {
      const token = request.params.get('access_key') || ''; // extract token from URL params
      if (MockApiService.isValidToken(token)) {
        this.apiResponse.result = Math.floor(Math.random() * 100) + 1; // generate a random number as converted amount
        return of(new HttpResponse({status: 200, body: this.apiResponse})); // return a success JSON body
      }
      return of(new HttpResponse({status: 201, body: this.invalidToken})); // return a failed JSON body

    }
    return next.handle(request); // skip request if it doesn't match url for currency conversion
  }

  // check if supplied token is valid
  private static isValidToken(token: string): boolean {
    return token === '6e549c34cd4597298f8e0393c1c4a22c';
  }
}

