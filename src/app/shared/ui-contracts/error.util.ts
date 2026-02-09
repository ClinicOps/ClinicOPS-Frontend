import { ErrorResponse } from '../../core/api';

export function normalizeError(err: any): string {
  if (err?.error?.message) {
    return err.error.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return 'Something went wrong. Please try again.';
}
