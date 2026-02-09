import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './error-response.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorNormalizerService {

  normalize(error: unknown): ErrorResponse {
    if (error instanceof HttpErrorResponse) {
      return this.fromHttpError(error);
    }

    return {
      timestamp: new Date().toISOString(),
      status: 500,
      error: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      path: ''
    };
  }

  private fromHttpError(error: HttpErrorResponse): ErrorResponse {
    const backendError = error.error as Partial<ErrorResponse>;

    return {
      timestamp: backendError.timestamp ?? new Date().toISOString(),
      status: error.status,
      error: backendError.error ?? 'HTTP_ERROR',
      message: backendError.message ?? 'Request failed',
      path: backendError.path ?? ''
    };
  }
}
