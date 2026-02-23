import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor, DoctorStatus } from '../types';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
})
export class DoctorFormComponent implements OnInit {
  @Input() doctor?: Doctor;
  @Input() isEdit = false;

  @Output() save = new EventEmitter<any>();

  form!: FormGroup;

  statuses: DoctorStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'VISITING'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      licenseNumber: [
        { value: this.doctor?.licenseNumber || '', disabled: this.isEdit },
        Validators.required,
      ],
      firstName: [this.doctor?.firstName || '', Validators.required],
      lastName: [this.doctor?.lastName || '', Validators.required],
      phone: [this.doctor?.['phone'] || ''],
      email: [this.doctor?.['email'] || ''],
      profileImageUrl: [this.doctor?.profileImageUrl || ''],

      specializations: [this.doctor?.specializations || [], Validators.required],
      newSpecialization: [''],

      consultationFee: [this.doctor?.consultationFee || 0, Validators.required],

      status: [this.doctor?.status || 'ACTIVE', Validators.required],
      available: [this.doctor?.available ?? true],

      visitingFrom: [null],
      visitingTo: [null],
    });

    this.setupVisitingWatcher();
  }

  private setupVisitingWatcher() {
    this.form.get('status')?.valueChanges.subscribe((status) => {
      if (status === 'VISITING') {
        this.form.get('visitingFrom')?.setValidators(Validators.required);
        this.form.get('visitingTo')?.setValidators(Validators.required);
      } else {
        this.form.get('visitingFrom')?.clearValidators();
        this.form.get('visitingTo')?.clearValidators();
        this.form.patchValue({
          visitingFrom: null,
          visitingTo: null,
        });
      }

      this.form.get('visitingFrom')?.updateValueAndValidity();
      this.form.get('visitingTo')?.updateValueAndValidity();
    });
  }

  addSpecialization() {
    const value = this.form.value.newSpecialization?.trim();
    if (!value) return;

    const current = this.form.value.specializations || [];
    this.form.patchValue({
      specializations: [...current, value],
      newSpecialization: '',
    });
  }

  removeSpecialization(index: number) {
    const current = [...this.form.value.specializations];
    current.splice(index, 1);
    this.form.patchValue({ specializations: current });
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const payload = {
      ...raw,
      specializations: raw.specializations
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s),
    };

    this.save.emit(payload);
  }
}
