import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../../../services/patient.service';

@Component({
  selector: 'app-patient-info-show',
  templateUrl: './patient-info-show.component.html',
  styleUrls: ['./patient-info-show.component.scss']
})
export class PatientInfoShowComponent implements OnInit {

  @Input()
  patient:Patient
  @Input()
  hasSelect:boolean = true

  constructor() { }

  ngOnInit() {

  }

}
