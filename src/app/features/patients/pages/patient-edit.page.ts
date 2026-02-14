import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientsFacade } from '../patients.facade';
import { PatientFormComponent } from '../components/patient-form.component';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.facade.getById(this.id).subscribe(res => {
      this.patient = res;
    });
  }

  onSave(data: any) {
    this.loading = true;

    this.facade.update(this.id, data).subscribe({
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
