export interface Patient {
  id: string;
  patientCode: string;

  firstName: string;
  lastName: string;

  mobile: string;
  email: string;

  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
