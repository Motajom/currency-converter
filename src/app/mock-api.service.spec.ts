import { HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { MockApiService } from './mock-api.service';
import { of } from 'rxjs';

describe('MockApiService', () => {
  let service: MockApiService;
  let request: HttpRequest<any>;
  let next: HttpHandler;

  beforeEach(() => {
    service = new MockApiService();
    request = new HttpRequest('GET', 'http://data.fixer.io/api/convert');
    next = {
      handle: jasmine.createSpy().and.returnValue(of(new HttpResponse())),
    } as HttpHandler;
  });

  it('should intercept and return a successful response when the token is valid', () => {
    spyOn(request.params, 'get').and.returnValue('6e549c34cd4597298f8e0393c1c4a22c');

    service.intercept(request, next).subscribe((event: HttpEvent<any>) => {
      expect(event instanceof HttpResponse).toBe(true);
      expect((event as HttpResponse<any>).status).toBe(200);
      expect((event as HttpResponse<any>).body).toEqual(service.apiResponse);
    });
  });

  it('should intercept and return an error response when the token is invalid', () => {
    spyOn(request.params, 'get').and.returnValue('invalid-token');

    service.intercept(request, next).subscribe((event: HttpEvent<any>) => {
      expect(event instanceof HttpResponse).toBe(true);
      expect((event as HttpResponse<any>).status).toBe(201);
      expect((event as HttpResponse<any>).body).toEqual(service.invalidToken);
    });
  });

  it('should pass the request to the next handler if the URL does not match', () => {
    const differentUrlRequest = new HttpRequest('GET', 'http://example.com/api/data');

    service.intercept(differentUrlRequest, next).subscribe((event: HttpEvent<any>) => {
      expect(event).toBeInstanceOf(HttpResponse);
      expect(next.handle).toHaveBeenCalledWith(differentUrlRequest);
    });
  });

});
