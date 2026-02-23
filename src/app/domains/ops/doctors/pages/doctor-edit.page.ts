import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorFormComponent } from '../components/doctor-form.component';
import { DoctorsFacade } from '../doctors.facade';
import { DoctorApi } from '../doctor.api';

@Component({
  standalone: true,
  imports: [DoctorFormComponent],
  template: `
    <h2>Edit Doctor</h2>
    <app-doctor-form
      *ngIf="doctor"
      [doctor]="doctor"
      [isEdit]="true"
      (save)="onSave($event)" />
  `
})
export class DoctorEditPage implements OnInit {

  doctor: any;

  constructor(
    private route: ActivatedRoute,
    private api: DoctorApi,
    private facade: DoctorsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.get(id).subscribe((res: any) => {
      this.doctor = res.data;
    });
  }

  onSave(payload: any) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.facade.updateDoctor(id, payload).subscribe(() => {
      this.router.navigate(['../../']);
    });
  }
}