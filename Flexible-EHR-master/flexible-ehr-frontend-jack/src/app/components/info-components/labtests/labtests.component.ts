import { Component, OnInit } from '@angular/core';
import {GlobaldataService} from "../../../services/globaldata.service";

interface checkboxElement {
  value: string;
  name: string;
}

@Component({
  selector: 'app-labtests',
  templateUrl: './labtests.component.html',
  styleUrls: ['./labtests.component.scss']
})
export class LabtestsComponent implements OnInit {

  panelOpenState = [false,false,false,false,false,false,false,false,false];

  Basic_Metabolic_Panel: checkboxElement[] = [
    {value: "BUN", name: "BUN"},
    {value: "HCO3", name: "HCO3"},
    {value: "Cr", name: "Cr"},
    {value: "Cl", name: "Cl"},
    {value: "Na", name: "Na"},
    {value: "Glu", name: "Glu"},
    {value: "Ca", name: "Ca"}
  ];

  CBC: checkboxElement[] = [
    {value: "WBC", name: "WBC"},
    {value: "HCT", name: "HCT"},
    {value: "HGB", name: "HGB"},
    {value: "PLT", name: "PLT"}
  ];


  CBC_cells: checkboxElement[] = [{"value": "RBC Red blood cells", "name": "RBC Red blood cells"}, {"value": "MCV Mean Cell Volume", "name": "MCV Mean Cell Volume"}, {"value": "MCH Mean Cell Hemoglobin", "name": "MCH Mean Cell Hemoglobin"}, {"value": "MCHC Mean Cell Hemoglobin Concentration", "name": "MCHC Mean Cell Hemoglobin Concentration"}, {"value": "RCDW Red Cell Diameter Width", "name": "RCDW Red Cell Diameter Width"}, {"value": "MPV Mean Platelet Volume", "name": "MPV Mean Platelet Volume"}, {"value": "Nucleated RBC auto (nRBC)", "name": "Nucleated RBC auto (nRBC)"}];

  eGFT: checkboxElement[] = [{"value": "eGFR non-black", "name": "eGFR non-black"}, {"value": "eGFR black", "name": "eGFR black"}];

  Troponin: checkboxElement[] = [{"value": "Troponin", "name": "Troponin"}];

  CPK: checkboxElement[] = [ {"value": "CPK Index", "name": "CPK Index"}, {"value": "CPK MB", "name": "CPK MB"}, {"value": "CPK Total", "name": "CPK Total"}];

  LFT: checkboxElement[] = [{"value": "Alb", "name": "Alb"}, {"value": "Alk Ph", "name": "Alk Ph"}, {"value": "ALT", "name": "ALT"}, {"value": "AST", "name": "AST"}, {"value": "T bili", "name": "T bili"}, {"value": "D bili", "name": "D bili"}];

  Urinalysis: checkboxElement[] = [{"value": "Bacteria", "name": "Bacteria"}, {"value": "blood", "name": "blood"}, {"value": "glucose", "name": "glucose"}, {"value": "ketones", "name": "ketones"}, {"value": "leuk est", "name": "leuk est"}, {"value": "nitrite", "name": "nitrite"}, {"value": "protein", "name": "protein"}];

  RBC: checkboxElement[] = [{"value": "WBC", "name": "WBC"}, {"value": "Spec grav", "name": "Spec grav"}, {"value": "Epithelial cells", "name": "Epithelial cells"}];

  ABG: checkboxElement[] = [{"value": "pCO2", "name": "pCO2"}, {"value": "pO2", "name": "pO2"}, {"value": "O2sat", "name": "O2sat"}, {"value": "pH", "name": "pH"}, {"value": "base ex", "name": "base ex"}];



  constructor(
    private globalData: GlobaldataService
  ) { }


  ngOnInit() {
  }

  choosenEle: {
    Basic_Metabolic_Panel: string[],
    CBC: string[],
    CBC_cells: string[],
    eGFR: string[],
    Troponin: string[],
    CPK: string[],
    LFT: string[],
    Urinalysis: string[],
    RBC: string[],
    ABG: string[]
  }
  onChangeCategory($event, element, num) {
    switch (num-1) {
      case 0:
        this.choosenEle.Basic_Metabolic_Panel.push(element.name);
        break;
      case 1:
        this.choosenEle.CBC_cells.push(element.name);
        break;
      case 2:
        this.choosenEle.CBC_cells.push(element.name);
        break;
      case 3:
        this.choosenEle.Troponin.push(element.name);
        break;
      case 4:
        this.choosenEle.CPK.push(element.name);
        break;
      case 5:
        this.choosenEle.LFT.push(element.name);
        break;
      case 6:
        this.choosenEle.Urinalysis.push(element.name);
        break;
      case 7:
        this.choosenEle.RBC.push(element.name);
        break;
      case 8:
        this.choosenEle.ABG.push(element.name);
        break;
    }
    this.globalData.setChoosenEle(this.choosenEle)
  }

}

