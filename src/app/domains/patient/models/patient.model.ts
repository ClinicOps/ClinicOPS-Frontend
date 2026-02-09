export interface Patient {
  id: string;
  name: string;
  clinicId: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE';
}
