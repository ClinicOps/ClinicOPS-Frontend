import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientFormComponent } from '../components/patient-form.component';
import { PatientsFacade } from '../patients.facade';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientFormComponent],
  templateUrl: './patient-edit.page.html'
})
export class PatientEditPage implements OnInit {

  patient: any;
  loading = false;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private facade: PatientsFacade,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id')!;
    this.loadPatient();
  });
}

private loadPatient() {
  this.facade.getById(this.id)?.subscribe(res => {
    this.patient = { ...res };
    this.cdr.markForCheck();
  });
}


  onSave(data: any) {
    this.loading = true;

    this.facade.update(this.id, data)?.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/patients']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

