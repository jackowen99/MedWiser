import { Component, OnInit } from '@angular/core';
import {GlobaldataService} from "../../../services/globaldata.service";

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-searchchoice',
  templateUrl: './searchchoice.component.html',
  styleUrls: ['./searchchoice.component.scss']
})
export class SearchchoiceComponent implements OnInit {

  constructor(
    private globalData: GlobaldataService
  ) { }

  selectedSource: null;

  choices:Choice[] = [
    {value:'Id', viewValue:'Search By Id'},
    {value:'Name', viewValue:'Search By Name'}
  ];

  ngOnInit() {
  }

  onChanged() {
    this.globalData.setSearchChoice(this.selectedSource)
  }
}
