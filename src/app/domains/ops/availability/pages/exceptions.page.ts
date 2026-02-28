import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityFacade } from '../availability.facade';
import { DoctorAvailabilityException } from '../types';
import { ExceptionFormComponent } from '../components/exception-form.component';

@Component({
  standalone: true,
  selector: 'app-exceptions-page',
  imports: [CommonModule, ExceptionFormComponent],
  templateUrl: './exceptions.page.html',
})
export class ExceptionsPage {
  doctorId!: string;

  exceptions: DoctorAvailabilityException[] = [];
  showForm = false;
  editing?: DoctorAvailabilityException;

  constructor(
    private route: ActivatedRoute,
    private facade: AvailabilityFacade,
  ) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.load();
  }

  load() {
    if (!this.doctorId) return;

    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const future = new Date();
    future.setMonth(future.getMonth() + 3);
    const to = future.toISOString().split('T')[0];

    this.facade.getExceptions(this.doctorId, from, to)?.subscribe((res) => (this.exceptions = res));
  }

  add() {
    this.editing = undefined;
    this.showForm = true;
  }

  edit(item: DoctorAvailabilityException) {
    this.editing = item;
    this.showForm = true;
  }

  delete(id: string) {
    if (!confirm('Delete this exception?')) return;

    this.facade.deleteException(id)?.subscribe(() => this.load());
  }

  save(payload: DoctorAvailabilityException) {
    const call = this.editing?.id
      ? this.facade.updateException(this.editing.id, { ...payload, version: this.editing.version! })
      : this.facade.createException(payload);

    call?.subscribe(() => {
      this.showForm = false;
      this.load();
    });
  }
}
