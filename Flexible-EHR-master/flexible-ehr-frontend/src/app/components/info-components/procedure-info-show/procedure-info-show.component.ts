import {Component, Input, OnInit} from '@angular/core';
import {Procedures} from '../../../services/procedure.service';

@Component({
  selector: 'app-procedure-info-show',
  templateUrl: './procedure-info-show.component.html',
  styleUrls: ['./procedure-info-show.component.scss']
})
export class ProcedureInfoShowComponent implements OnInit {

  @Input()
  procedures:Procedures[]

  @Input()
  hasSelect:boolean = true


  constructor() { }

  ngOnInit() {
  }

}
