import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent implements OnChanges {

  @Input() initialData: any;
  @Input() loading = false;
  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      gender: ['MALE', Validators.required],
      dateOfBirth: [''],
      bloodGroup: [''],
      photoUrl: [''],

      mobile: ['', Validators.required],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.save.emit(this.form.value);
  }
}
