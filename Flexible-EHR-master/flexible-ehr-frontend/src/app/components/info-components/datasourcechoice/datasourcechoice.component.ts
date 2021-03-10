import { Component, OnInit } from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {GlobaldataService} from "../../../services/globaldata.service";

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-datasourcechoice',
  templateUrl: './datasourcechoice.component.html',
  styleUrls: ['./datasourcechoice.component.scss']
})
export class DatasourcechoiceComponent implements OnInit {

  constructor(
    public globalData: GlobaldataService
  ) { }

  selectedSource: null;

  choices:Choice[] = [
    {value:'Open', viewValue:'Open Epic'},
    {value:'Hapi', viewValue:'Hapi FHIR'},
    {value:'Id', viewValue: 'School server by Id'},
  ];

  ngOnInit() {
  }

  onChanged() {
    this.globalData.setDataSource(this.selectedSource)
  }

}
