export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface SlotDTO {
  start: string;
  end: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED' | 'EXPIRED';
}