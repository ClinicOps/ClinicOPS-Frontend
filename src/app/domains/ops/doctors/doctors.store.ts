import { Injectable, signal } from '@angular/core';
import { Doctor } from './types';

@Injectable({ providedIn: 'root' })
export class DoctorsStore {

  doctors = signal<Doctor[]>([]);
  loading = signal<boolean>(false);

  totalElements = signal<number>(0);
  totalPages = signal<number>(0);

  page = signal<number>(0);
  size = signal<number>(10);

  filters = signal<any>({
    search: '',
    specialization: '',
    status: '',
    available: ''
  });

  setDoctors(data: Doctor[]) {
    this.doctors.set(data);
  }

  setPagination(total: number, totalPages: number) {
    this.totalElements.set(total);
    this.totalPages.set(totalPages);
  }

  setLoading(val: boolean) {
    this.loading.set(val);
  }

  setPage(page: number) {
    this.page.set(page);
  }

  setFilters(filters: any) {
    this.filters.set(filters);
  }
}