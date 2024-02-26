import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle HTTP error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test-error',
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(console, 'error');

    service.handleError(errorResponse);

    expect(console.error).toHaveBeenCalledWith(
      `Error Status: ${errorResponse.status}\nMessage: ${errorResponse.message}`
    );
  });

  it('should handle client side error', () => {
    const error = new Error('Client side error');

    spyOn(console, 'error');

    service.handleError(error);

    expect(console.error).toHaveBeenCalledWith(error.message);
  });

  it('should handle no internet connection error', () => {
    const errorResponse = new HttpErrorResponse({
      error: new ErrorEvent('Network error'),
      status: 0,
      statusText: 'Unknown Error',
    });

    spyOn(console, 'error');
    spyOnProperty(navigator, 'onLine').and.returnValue(false);

    service.handleError(errorResponse);

    expect(console.error).toHaveBeenCalledWith(
      'No Internet Connection, please try again'
    );
  });
});
