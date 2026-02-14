import { Component, OnInit } from '@angular/core';
import { PatientsFacade } from '../patients.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.page.html',
  imports: [CommonModule],
})
export class PatientsListPage implements OnInit {

  constructor(public facade: PatientsFacade) {}

  ngOnInit() {
    const clinicId = '6990201416a40af61054fdbb'; // replace via session later
    this.facade.load();
  }
}
