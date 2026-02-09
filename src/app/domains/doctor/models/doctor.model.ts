export interface Doctor {
  id: string;
  name: string;
  clinicId: string;
  status: 'ACTIVE' | 'INACTIVE';
}
