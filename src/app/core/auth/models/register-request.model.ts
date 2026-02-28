export interface RegisterRequest {
  email: string;
  password: string;
  clinicName: string;
  clinicCode: string;
  organizationName?: string;
  clinicTimezone?: string;
}
