import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    let errorMessage = '';

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        errorMessage = 'No Internet Connection, please try again';
      } else {
        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
      }
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    this.logError(errorMessage);
  }

  private logError(message: string) {
    console.error(message);
  }
}
