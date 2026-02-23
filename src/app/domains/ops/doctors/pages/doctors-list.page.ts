import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsFacade } from '../doctors.facade';
import { DoctorsStore } from '../doctors.store';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctors-list.page.html',
})
export class DoctorsListPage implements OnInit {
  doctors;
  loading;
  totalElements;
  totalPages;
  page;
  size;

  selected = new Set<string>();

  visitingModalDoctor: any = null;
  visitingFrom = '';
  visitingTo = '';

  filters = {
    search: '',
    specialization: '',
    status: '',
    available: '',
  };

  constructor(
    private facade: DoctorsFacade,
    private store: DoctorsStore,
  ) {
    this.doctors = this.store.doctors;
    this.loading = this.store.loading;
    this.totalElements = this.store.totalElements;
    this.totalPages = this.store.totalPages;
    this.page = this.store.page;
    this.size = this.store.size;
  }

  ngOnInit() {
    this.facade.loadDoctors();
  }

  applyFilters() {
    this.store.setFilters(this.filters);
    this.store.setPage(0);
    this.facade.loadDoctors();
  }

  archive(doctor: any) {
    if (!confirm('Archive this doctor?')) return;

    this.facade.archiveDoctor(doctor.clinicDoctorId).subscribe(() => this.facade.loadDoctors());
  }

  edit(doctor: any) {
    // use router navigate
  }

  changeStatus(doctor: any, newStatus: string) {
    if (newStatus === 'VISITING') {
      this.visitingModalDoctor = doctor;
      return;
    }

    this.facade
      .changeStatus(doctor.clinicDoctorId, { status: newStatus })
      .subscribe(() => this.facade.loadDoctors());
  }

  confirmVisiting() {
    this.facade
      .changeStatus(this.visitingModalDoctor.clinicDoctorId, {
        status: 'VISITING',
        visitingFrom: this.visitingFrom,
        visitingTo: this.visitingTo,
      })
      .subscribe(() => {
        this.closeModal();
        this.facade.loadDoctors();
      });
  }

  closeModal() {
    this.visitingModalDoctor = null;
  }

  toggle(doctor: any) {
    if (this.selected.has(doctor.clinicDoctorId)) {
      this.selected.delete(doctor.clinicDoctorId);
    } else {
      this.selected.add(doctor.clinicDoctorId);
    }
  }

  isSelected(doctor: any) {
    return this.selected.has(doctor.clinicDoctorId);
  }

  toggleAll(event: any) {
    if (event.target.checked) {
      this.doctors().forEach((d) => this.selected.add(d.clinicDoctorId));
    } else {
      this.selected.clear();
    }
  }

  changePage(delta: number) {
    const newPage = this.page() + delta;

    if (newPage < 0 || newPage >= this.totalPages()) return;

    this.store.setPage(newPage);
    this.facade.loadDoctors();
  }

  bulkArchive() {
    if (!confirm('Archive selected doctors?')) return;

    const ids = Array.from(this.selected);

    // call backend bulk endpoint when implemented
    ids.forEach((id) => this.facade.archiveDoctor(id).subscribe());

    this.selected.clear();
    this.facade.loadDoctors();
  }

  exportCSV() {
    const rows = this.doctors();

    const header = ['Name', 'License', 'Status', 'Available', 'Specializations', 'Fee'];

    const csv = [
      header.join(','),
      ...rows.map((d) =>
        [
          `${d.firstName} ${d.lastName}`,
          d.licenseNumber,
          d.status,
          d.available,
          d.specializations.join('|'),
          d.consultationFee,
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'doctors.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
