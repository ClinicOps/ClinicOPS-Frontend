export type DoctorStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'VISITING';

export interface Doctor {
  id: string;                 // doctorId
  clinicDoctorId: string;     // scoped id

  firstName: string;
  lastName: string;
  licenseNumber: string;
  phone?: string;
  email?: string;

  profileImageUrl?: string;

  specializations: string[];

  consultationFee: number;

  status: DoctorStatus;
  available: boolean;

  archived: boolean;
}

export interface CreateDoctorRequest {
  licenseNumber: string;
  firstName: string;
  lastName: string;

  phone?: string;
  email?: string;
  qualifications?: string[];

  profileImageUrl?: string;

  specializations: string[];
  consultationFee: number;

  status: DoctorStatus;

  visitingFrom?: string;
  visitingTo?: string;
}