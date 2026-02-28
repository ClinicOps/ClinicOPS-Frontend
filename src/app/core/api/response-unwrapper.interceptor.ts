import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Unwraps ApiResponse wrapper automatically for all HTTP responses.
 * Backend wraps all responses in ApiResponse<T>, this interceptor extracts T.
 */
export const responseUnwrapperInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      // Only process HttpResponse events with a body
      if (!(event instanceof HttpResponse) || !event.body) {
        return event;
      }

      const body = event.body;

      // Check if response has the ApiResponse structure
      // Only unwrap if it has the expected shape
      if (
        typeof body === 'object' &&
        body !== null &&
        'success' in body &&
        'data' in body
      ) {
        const apiResponse = body as ApiResponse<any>;
        // Return the unwrapped data, maintaining the response structure
        return event.clone({ body: apiResponse.data });
      }

      // Return as-is if not an ApiResponse (e.g., error responses)
      return event;
    })
  );
};

