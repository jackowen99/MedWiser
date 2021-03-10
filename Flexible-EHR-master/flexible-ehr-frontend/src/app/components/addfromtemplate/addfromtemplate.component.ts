import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import {StoreService} from "../../services/store.service";
import {PanelService} from "../../services/panel.service";
import {NoteService} from "../../services/note.service";
import {DiagnosticreportService} from "../../services/diagnosticreport.service";
import {ConditionsService} from "../../services/conditions.service";
import {MedicationorderService} from "../../services/medicationorder.service";
import {ObservationService} from "../../services/observation.service";
import {InfoSelectDialogComponent} from "../../dialog/info-select-dialog/info-select-dialog.component";
import {PatientService} from "../../services/patient.service";
import {GlobaldataService} from "../../services/globaldata.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {TemplateService} from "../../services/template.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import { VitalService } from 'src/app/services/vital.service';

@Component({
  selector: 'app-addfromtemplate',
  templateUrl: './addfromtemplate.component.html',
  styleUrls: ['./addfromtemplate.component.scss']
})
export class AddfromtemplateComponent implements OnInit {

  canFinish: boolean;
  @ViewChild('patientInfo') patientInfo
  step: number;
  cardDetails = []
  notesTobeAdd = [];
  cur_panel;
  colors = [];
  position = [];
  canEidt: boolean;

  isDuplicate: boolean
  form: FormGroup;
  patient = new FormControl({value: true, disabled: true})
  observation = new FormControl()
  vital = new FormControl()
  medicationorder = new FormControl()
  diagnosticreport = new FormControl()
  isPublic = new FormControl()
  condition = new FormControl()
  templateName = new FormControl()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storeService: StoreService,
    public panelService: PanelService,
    private noteService: NoteService,
    private diagnosticreportService: DiagnosticreportService,
    private conditionService: ConditionsService,
    private medicationService: MedicationorderService,
    private observationService: ObservationService,
    private patientService: PatientService,
    private globaldataService: GlobaldataService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    private templateService: TemplateService,
    private vitalService: VitalService,
  ) {
  }

  ngOnInit() {
    this.step = 0;
    let s = this.data.templateName;
    this.templateName.setValue(s);
    this.patient = new FormControl({value: true, disabled: true})
    if (this.data.isPublic) {
      this.isPublic = new FormControl(true)
    } else {
      this.isPublic = new FormControl()
    }

    for (let i in this.data.templateDetail) {
      if (this.data.templateDetail[i] == 'patient') {
        this.cardDetails.push('Patient Info')
      }
      if (this.data.templateDetail[i] == 'observation') {
        this.cardDetails.push(' Observation')
        this.observation = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'vital') {
        this.cardDetails.push(' Vital Signs')
        this.vital = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'medicationorder') {
        this.cardDetails.push(' Medication Order')
        this.medicationorder = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'diagnosticreport') {
        this.cardDetails.push(' Diagnostic Report')
        this.diagnosticreport = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'condition') {
        this.cardDetails.push(' Condition')
        this.condition = new FormControl({value: true})
      }
    }
    this.canFinish = false;
    this.canEidt = false;
  }


  async runPatientInfo() {
    let that = this;
    const {patientInfo: patientInfo1} = that;
    let patientId = patientInfo1.selectedPatient.id;
    let patientCd = patientInfo1.selectedPatient.code;
    let patientName = patientInfo1.selectedPatient.name;

    for (let i in this.data.templateDetail) {
      let res;
      if (this.data.templateDetail[i] == 'patient') {
        if (this.globaldataService.getDataSource() == "Id")
          res = await this.patientService.search(patientId);
        else {
          res = await this.patientService.search(patientName);
        }
        if (res) {
          res = {
            type: "patient",
            data: res.filter(x => x.id == patientId),
            parameters: {
              patientId: patientId
            }
          }
        }
      }
      if (this.data.templateDetail[i] == 'observation') {
        res = await this.observationService.searchByPatientId(patientId, patientCd);
        if (res) {
          res = {
            type: "observation",
            data: res,
            parameters: {
              patientId: patientId,
              patientCode: patientCd
            }
          }
        }
      }
      if (this.data.templateDetail[i] == 'vital') {
        res = await this.vitalService.searchByPatientId(patientId, patientCd);
        if (res) {
          res = {
            type: "vital",
            data: res,
            parameters: {
              patientId: patientId,
              patientCode: patientCd
            }
          }
        }
      }
      if (this.data.templateDetail[i] == 'medicationorder') {
        res = await this.medicationService.searchByPatientId(patientId);
        if (res) {
          res = {
            type: "medicationorder",
            // data: data.filter(x=>(x.identifier_system == that.notes[i][1][0].identifier_system && x.identifier_code == that.notes[i][1][0].identifier_code)),
            data: res,
            parameters: {
              patientId: patientId,
              medicationOrders: [res[0] ? res[0].MedicationOrder_id : '']
            }
          }
        }
      }
      if (this.data.templateDetail[i] == 'diagnosticreport') {
        res = await this.diagnosticreportService.searchByPatientId(patientId);
        if (res) {
          res = {
            type: "diagnosticreport",
            // data: data.filter(x=>x.code == this.notes[i][1][0].code),
            data: res,
            parameters: {
              patientId: patientId,
              diagnosticReport: [res[0] ? res[0].id : '']
            }
          }
        }
      }
      if (this.data.templateDetail[i] == 'condition') {
        res = await this.conditionService.searchByPatientId(patientId);
        if (res) {
          res = {
            type: "condition",
            // data: data.filter(x=>target.includes(x.code)),
            data: res,
            parameters: {
              patientId: patientId,
              conditions: [res[0] ? res[0].id : '']
            }
          }
        }
      }
      if (res) {
        this.notesTobeAdd.push(res);
      }

    }
    this.canFinish = true;
  }

  addAllNotes() {
    this.dialogRef.close({data: [this.cur_panel, this.notesTobeAdd, this.colors, this.position]});

    if (this.patientInfo.selectedPatient.name == "We do not have name record") {
      this.panelService.activePanel.title = this.patientInfo.selectedPatient.id;
    } else {
      this.panelService.activePanel.title = this.patientInfo.selectedPatient.name;
    }
    this.globaldataService.setPatient(this.patientInfo.selectedPatient)
  }

  next() {
    this.step++;
    this.cur_panel = this.panelService.addPanel();
  }

  edit() {
    this.canEidt = true;
  }

  back() {
    this.canEidt = false;
  }

  async save() {
    this.data.templateName = this.templateName.value
    let arr = ["patient"]
    if (this.observation.value) {
      arr.push("observation")
    }
    if (this.vital.value) {
      arr.push("vital")
    }
    if (this.medicationorder.value) {
      arr.push("medicationorder")
    }
    if (this.diagnosticreport.value) {
      arr.push("diagnosticreport")
    }
    if (this.condition.value) {
      arr.push('condition')
    }
    this.data.templateDetail = arr;
    this.cardDetails = []

    for (let i in this.data.templateDetail) {
      if (this.data.templateDetail[i] == 'patient') {
        this.cardDetails.push('Patient Info')
      }
      if (this.data.templateDetail[i] == 'observation') {
        this.cardDetails.push(' Observation')
        this.observation = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'vital') {
        this.cardDetails.push(' Vital Signs')
        this.vital = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'medicationorder') {
        this.cardDetails.push(' Medication Order')
        this.medicationorder = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'diagnosticreport') {
        this.cardDetails.push(' Diagnostic Report')
        this.diagnosticreport = new FormControl({value: true})
      }
      if (this.data.templateDetail[i] == 'condition') {
        this.cardDetails.push(' Condition')
        this.condition = new FormControl({value: true})
      }
    }
    let bool: boolean = this.isPublic.value == null? false: this.isPublic.value;
    this.data.isPublic = bool
    await this.templateService.updateTemplate(this.data);
    this.canEidt = false;
  }

  async delete() {
    await this.templateService.deleteTemplate(this.data.id);
    this.dialogRef.close(null);
    this.data = new DefaultTemplate();
  }
}

class DefaultTemplate {
  id: number;
  templateName: string;
  username: string;
  isPublic: boolean;
  templateDetail: string[]
}
