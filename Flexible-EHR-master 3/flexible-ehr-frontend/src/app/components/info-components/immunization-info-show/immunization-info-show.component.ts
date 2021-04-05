import {Component, Input, OnInit} from '@angular/core';
import {Immunizations} from '../../../services/immunization.service';

@Component({
  selector: 'app-immunization-info-show',
  templateUrl: './immunization-info-show.component.html',
  styleUrls: ['./immunization-info-show.component.scss']
})
export class ImmunizationInfoShowComponent implements OnInit {

  @Input()
  immunizations:Immunizations[]

  @Input()
  hasSelect:boolean = true

  constructor() { }

  ngOnInit() {
  }

}
