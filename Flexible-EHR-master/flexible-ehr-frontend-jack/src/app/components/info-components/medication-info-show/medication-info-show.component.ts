import { Component, Input, OnInit } from '@angular/core';
import {Patient} from '../../../services/patient.service';
import {MedicationOrder} from '../../../services/medicationorder.service';
@Component({
  selector: 'app-medication-info-show',
  templateUrl: './medication-info-show.component.html',
  styleUrls: ['./medication-info-show.component.scss']
})
export class MedicationInfoShowComponent implements OnInit {
  
  @Input()
  medicationOrders:MedicationOrder[]

  @Input()
  hasSelect:boolean = true

  constructor() { }

  ngOnInit() {
  }



}
