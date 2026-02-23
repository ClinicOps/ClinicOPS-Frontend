export interface DoctorAvailability {
  id?: string;
  doctorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  bufferMinutes: number;
  validFrom: string;
  validTo?: string;
  isActive?: boolean;
  version?: number;
}

export type ExceptionType = 'BLOCKED' | 'LEAVE' | 'EXTRA';

export interface DoctorAvailabilityException {
  id?: string;
  doctorId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: ExceptionType;
  reason?: string;
  version?: number;
}