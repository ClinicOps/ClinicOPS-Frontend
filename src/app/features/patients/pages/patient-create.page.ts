import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsFacade } from '../patients.facade';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-create.page.html'
})
export class PatientCreatePage {

  loading = false;

  form: FormGroup;

constructor(
  private fb: FormBuilder,
  private facade: PatientsFacade,
  private router: Router
) {
  this.form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: [''],
    gender: ['MALE', Validators.required],
    dateOfBirth: [''],
    bloodGroup: [''],
    photoUrl: [''],

    mobile: ['', [Validators.required]],
    email: [''],
    address: [''],
    city: [''],
    state: [''],
    pincode: [''],

    allergies: [[]],
    chronicConditions: [[]],
    notes: ['']
  });
}

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.facade.create(this.form.value).subscribe({
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
