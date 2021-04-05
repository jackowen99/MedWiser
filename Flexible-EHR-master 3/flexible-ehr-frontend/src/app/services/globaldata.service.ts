import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Patient} from './patient.service';
import {PanelService} from "./panel.service";

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {


  dataSource: string[] = [];

  searchChoice = 'Name';

  patient: Patient[] = []

  dataURL_by_schoolLab = 'http://130.49.206.139:8080/omoponfhir-stu3/fhir/';

  choosenEle = {
    Basic_Metabolic_Panel: ['BUN', 'HCO3', 'Cr', 'Cl', 'Na', 'Glu', 'Ca', 'Potassium serum/plasma', 'Creatinine serum/plasma',"Carbon dioxide, total [Moles/volume] in Serum or Plasma"],
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

  displayEle = {
    elements: [{name: 'Basic_Metabolic_Panel', chooseEle: []},
      {name: 'CBC', chooseEle: []},
      {name: 'CBC_cells', chooseEle: []},
      {name: 'eGFT', chooseEle: []},
      {name: 'Troponin', chooseEle: []},
      {name: 'CPK', chooseEle: []},
      {name: 'LFT', chooseEle: []},
      {name: 'Urinalysis', chooseEle: []},
      {name: 'RBC', chooseEle: []},
      {name: 'ABG', chooseEle: []}]
  };


  constructor(private panelService: PanelService) {

  }

  setDataSource(data) {
    let index = this.panelService.activePanelIndex;
    this.dataSource[index] = data;
    this.patient[index] = null;
  }

  setSearchChoice(data) {
    this.searchChoice = data;
  }

  getDataSource() {
    let index = this.panelService.activePanelIndex;
    return this.dataSource[index] == null ? "Open": this.dataSource[index];
  }

  getSeachChoice() {
    return this.searchChoice;
  }

  getDisPlayEle() {
    return this.displayEle;
  }

  setChoosenEle(data) {
    this.choosenEle = data;
  }

  getChoosenEle() {
    return this.choosenEle;
  }

  setPatient(data) {
    let index = this.panelService.activePanelIndex;
    this.patient[index] = data;
  }

  getPatient() {
    let index = this.panelService.activePanelIndex;
    return this.patient[index];
  }

  removePatient(id) {
    this.patient.splice(id, 1);
  }

  removeDataSource(id) {
    this.dataSource.splice(id, 1);
  }


}

