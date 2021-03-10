import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {InfoSelectDialogComponent} from '../dialog/info-select-dialog/info-select-dialog.component';
import {PanelTitleAddInputComponent} from '../components/panel-tab/sub-components/panel-title-add-input/panel-title-add-input.component';

enum InfoDialogType {
  patient = 0,
  observation = 1
}


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private matDialog:MatDialog
  ) { }

  showInfoDialog(type:InfoDialogType = InfoDialogType.patient){
    return this.matDialog.open(InfoSelectDialogComponent,{
      minWidth:"800px",
      minHeight:"600px",
      data:type
    })
  }

  showInputComponent(){
    return this.matDialog.open(PanelTitleAddInputComponent,{
      minWidth:"800px",
      minHeight:"600px",
      data: []
    })
  }

}
