import { Component, Input, OnInit } from '@angular/core';
import {Patient} from '../../../services/patient.service';
import {Report} from '../../../services/diagnosticreport.service';

@Component({
  selector: 'app-diagnosticreport-info-show',
  templateUrl: './diagnosticreport-info-show.component.html',
  styleUrls: ['./diagnosticreport-info-show.component.scss']
})
export class DiagnosticreportInfoShowComponent implements OnInit {
  
  @Input()
  diagnosticReports:Report[]

  @Input()
  hasSelect:boolean = true

  constructor() { }

  ngOnInit() {
  }

}
