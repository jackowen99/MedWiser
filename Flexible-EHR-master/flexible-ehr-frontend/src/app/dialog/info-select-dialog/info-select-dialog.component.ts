import { Component, OnInit } from '@angular/core';
import {GlobaldataService} from "../../services/globaldata.service";

@Component({
  selector: 'app-info-select-dialog',
  templateUrl: './info-select-dialog.component.html',
  styleUrls: ['./info-select-dialog.component.scss']
})
export class InfoSelectDialogComponent implements OnInit {

  constructor(
    public globaldataService: GlobaldataService
  ) { }

  ngOnInit() {
  }

}
