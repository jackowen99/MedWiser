import {Component, Input, OnInit} from '@angular/core';
import {Documentreferences} from '../../../services/documentreference.service';
import {AllergyInTolerance} from '../../../services/allergyInTolerance.service';

@Component({
  selector: 'app-documentreference-info-show',
  templateUrl: './documentreference-info-show.component.html',
  styleUrls: ['./documentreference-info-show.component.scss']
})
export class DocumentreferenceInfoShowComponent implements OnInit {

  @Input()
  documentreferences:Documentreferences[]

  @Input()
  hasSelect:boolean = true


  constructor() { }

  ngOnInit() {
  }

}
