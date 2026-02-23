import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DoctorAvailability } from '../types';

@Component({
  selector: 'app-time-range-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-range-form.component.html'
})
export class TimeRangeFormComponent {

  @Input() doctorId!: string;
  @Input() dayOfWeek!: string;
  @Input() model?: DoctorAvailability;

  @Output() saved = new EventEmitter<DoctorAvailability>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    slotDurationMinutes: [15, [Validators.required, Validators.min(1)]],
    bufferMinutes: [0, [Validators.min(0)]],
    validFrom: ['', Validators.required],
    validTo: ['']
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

    if (value.startTime! >= value.endTime!) {
      alert('Start time must be before end time');
      return;
    }

    const payload: DoctorAvailability = {
      ...value,
      doctorId: this.doctorId,
      dayOfWeek: this.dayOfWeek
    } as DoctorAvailability;

    this.saved.emit(payload);
  }
}