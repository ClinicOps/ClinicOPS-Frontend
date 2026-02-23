import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorAvailabilityException } from '../types';

@Component({
  selector: 'app-exception-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exception-form.component.html'
})
export class ExceptionFormComponent {

  @Input() doctorId!: string;
  @Input() model?: DoctorAvailabilityException;

  @Output() saved = new EventEmitter<DoctorAvailabilityException>();
  @Output() cancelled = new EventEmitter<void>();

  form : FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    date: ['', Validators.required],
    type: ['BLOCKED', Validators.required],
    startTime: [''],
    endTime: [''],
    reason: ['']
  });
  }

  ngOnInit() {
    if (this.model) {
      this.form.patchValue(this.model);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    if (value.startTime && !value.endTime) {
      alert('End time required');
      return;
    }

    if (value.startTime && value.startTime >= value.endTime!) {
      alert('Start time must be before end time');
      return;
    }

    const payload: DoctorAvailabilityException = {
      ...value,
      doctorId: this.doctorId
    } as DoctorAvailabilityException;

    this.saved.emit(payload);
  }
}