import {Component, Input, OnInit} from '@angular/core';
import {AllergyInTolerance} from '../../../services/allergyInTolerance.service';

@Component({
  selector: 'app-allergy-in-tolerance-info-show',
  templateUrl: './allergyInTolerance-info-show.component.html',
  styleUrls: ['./allergyInTolerance-info-show.component.scss']
})
export class AllergyInToleranceInfoShowComponent implements OnInit {

  @Input()
  allergyInTolerances:AllergyInTolerance[]

  @Input()
  hasSelect:boolean = true


  constructor() { }

  ngOnInit() {
  }

}
