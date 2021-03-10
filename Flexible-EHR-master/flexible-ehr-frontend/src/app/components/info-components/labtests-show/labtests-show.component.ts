import {Component, Injectable, Input, OnInit} from '@angular/core';
import {LabtestService} from '../../../services/labtest.service';
import {PanelService} from '../../../services/panel.service';
import {interval, Observable, timer} from 'rxjs';
import construct = Reflect.construct;
import {count} from 'rxjs/operators';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {OnChanges, SimpleChanges} from '@angular/core';
import {Note} from '../../../services/note.service';
import {GlobaldataService} from '../../../services/globaldata.service';

@Component({
  selector: 'app-labtests-show',
  templateUrl: './labtests-show.component.html',
  styleUrls: ['./labtests-show.component.scss'],
})
@Injectable({
  providedIn: 'root'
})

export class LabtestsShowComponent implements OnInit {

  @Input()
  patient: Note[] = [];

  count = 0;
  timer: any;

  constructor(
    public labtestService: LabtestService,
    public panelService: PanelService,
    public globalService: GlobaldataService
  ) {
  }

  @Input()
  dataSource: DataSource[];
  dataFrom: string;

  choose = {
    Basic_Metabolic_Panel: ['BUN', 'HCO3', 'Cr', 'Cl', 'Na', 'Glu', 'Ca', 'Potassium serum/plasma'],
    CBC: ['WBC', 'HCT', 'HGB', 'PLT'],
    CBC_cells: ['RBC Red blood cells', 'MCV Mean Cell Volume', 'MCH Mean Cell Hemoglobin', 'MCHC Mean Cell Hemoglobin Concentration', 'RCDW Red Cell Diameter Width', 'MPV Mean Platelet Volume', 'Nucleated RBC auto (nRBC)'],
    eGFR: ['eGFR non-black', 'eGFR black'],
    Troponin: ['Troponin'],
    CPK: ['CPK Index', 'CPK MB', 'CPK Total'],
    LFT: ['Alb', 'Alk Ph', 'ALT', 'AST', 'T bili', 'D bili'],
    Urinalysis: ['Bacteria', 'blood', 'glucose', 'ketones', 'leuk est', 'nitrite', 'protein'],
    RBC: ['WBC', 'Spec grav', 'Epithelial cells'],
    ABG: ['pCO2', 'pO2', 'O2sat', 'pH', 'base ex']
  };


  ngOnInit(): void {
    this.displayData();
  }

  displayData() {
    if (this.patient.length != 0) {

      let code;
      if (this.patient[0].cardOption.data[0]) {
        code = this.patient[0].cardOption.data[0].code;
      } else {
        code = this.patient[0].cardOption.data.code;
      }

      if (this.globalService.getDataSource() == 'Open') {
        let patient_id = this.patient ? this.patient[0].cardOption.parameters.patientId : '';
        this.labtestService.searchById(patient_id, code).then(data => {
          this.dataSource = data.elements;
        });
      } else if (this.globalService.getDataSource() == 'Hapi') {
        let patient_id = this.patient ? this.patient[0].cardOption.parameters.patientId : '';
        this.labtestService.searchById_Hapi(patient_id).then(data => {
          this.dataSource = data.elements;
        });
      }
    }
  }
}

interface DataSource {
  chooseEle: ChooseEle[]
}

interface ChooseEle {
  name: string,
  cur: number,
  unit: number
}
