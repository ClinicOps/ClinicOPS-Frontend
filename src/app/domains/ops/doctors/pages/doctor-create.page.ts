import { Component } from '@angular/core';
import { DoctorFormComponent } from '../components/doctor-form.component';
import { DoctorsFacade } from '../doctors.facade';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [DoctorFormComponent],
  template: `
    <h2>Create Doctor</h2>
    <app-doctor-form (save)="onSave($event)" />
  `
})
export class DoctorCreatePage {

  constructor(
    private facade: DoctorsFacade,
    private router: Router
  ) {}

  onSave(payload: any) {
    this.facade.createDoctor(payload)?.subscribe(() => {
      this.router.navigate(['../']);
    });
  }
}