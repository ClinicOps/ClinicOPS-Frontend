import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityFacade } from '../availability.facade';
import { DoctorAvailability } from '../types';
import { TimeRangeFormComponent } from '../components/time-range-form.component';

@Component({
  standalone: true,
  selector: 'app-weekly-schedule-page',
  imports: [CommonModule, TimeRangeFormComponent],
  templateUrl: './weekly-schedule.page.html'
})
export class WeeklySchedulePage {

  doctorId!: string;

  days = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
  selectedDay = 'MONDAY';

  schedules: DoctorAvailability[] = [];
  filtered: DoctorAvailability[] = [];

  showForm = false;
  editing?: DoctorAvailability;

  constructor(
    private route: ActivatedRoute,
    private facade: AvailabilityFacade
  ) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.load();
  }

  load() {
    this.facade.loadDoctorAvailability(this.doctorId)?.
      subscribe(res => {
        this.schedules = res;
        this.filter();
      });
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.filter();
  }

  filter() {
    this.filtered = this.schedules.filter(
      s => s.dayOfWeek === this.selectedDay && s.isActive
    );
  }

  add() {
    this.editing = undefined;
    this.showForm = true;
  }

  edit(item: DoctorAvailability) {
    this.editing = item;
    this.showForm = true;
  }

  deactivate(id: string) {
    if (!confirm('Deactivate this schedule?')) return;

    this.facade.deactivate(id)?.
      subscribe(() => this.load());
  }

  save(payload: DoctorAvailability) {
    const call = this.editing?.id
      ? this.facade.update(this.editing.id!, { ...payload, version: this.editing.version })
      : this.facade.create(payload);

    call?.subscribe(() => {
      this.showForm = false;
      this.load();
    });
  }
}