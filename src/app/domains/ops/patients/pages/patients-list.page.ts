import { Component, OnInit } from '@angular/core';
import { PatientsFacade } from '../patients.facade';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.page.html',
  imports: [RouterModule, CommonModule],
})
export class PatientsListPage implements OnInit {
  constructor(public facade: PatientsFacade) {}

  ngOnInit() {
    const clinicId = '6990201416a40af61054fdbb'; // replace via session later
    this.facade.load();
  }

  archive(id: string) {
    if (!confirm('Archive this patient?')) return;

    this.facade.archive(id).subscribe(() => {
      this.facade.load();
    });
  }

  activate(id: string) {
    this.facade.activate(id).subscribe(() => {
      this.facade.load();
    });
  }

  onSearch(event: any) {
    this.facade.setQuery(event.target.value);
    this.facade.resetPage();
    this.facade.load();
  }

  onStatusChange(event: any) {
    this.facade.setStatus(event.target.value);
    this.facade.resetPage();
    this.facade.load();
  }

  nextPage() {
    this.facade.nextPage();
    this.facade.load();
  }

  prevPage() {
    this.facade.prevPage();
    this.facade.load();
  }
}
