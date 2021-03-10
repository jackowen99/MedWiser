import { Component, Input, OnInit } from '@angular/core';
import {Patient} from '../../../services/patient.service';
import {Conditions} from '../../../services/conditions.service';

@Component({
  selector: 'app-conditions-info-show',
  templateUrl: './conditions-info-show.component.html',
  styleUrls: ['./conditions-info-show.component.scss']
})
export class ConditionsInfoShowComponent implements OnInit {
  
  @Input()
  conditions:Conditions[]

  @Input()
  hasSelect:boolean = true

  constructor() { }

  ngOnInit() {
  }

}
