import { signal } from '@angular/core';
import { Patient } from './types';


export class PatientsStore {

  patients = signal<Patient[]>([]);
  loading = signal(false);

  totalElements = signal(0);
  totalPages = signal(0);

  page = signal(0);
  size = signal(10);

  query = signal('');
  status = signal<'ACTIVE' | 'ARCHIVED' | 'ALL'>('ACTIVE');
}
