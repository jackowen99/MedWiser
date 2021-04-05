import {Component, OnInit, ViewChild} from '@angular/core';
import {PanelService} from "../../../../services/panel.service";
import {StoreService} from "../../../../services/store.service";
import {Note, NoteService} from "../../../../services/note.service";
import {MatDialogRef} from '@angular/material';
import {ConditionsService} from "../../../../services/conditions.service";
import {MedicationorderService} from "../../../../services/medicationorder.service";
import {ObservationService} from "../../../../services/observation.service";
import {DiagnosticreportService} from "../../../../services/diagnosticreport.service";
import {InfoSelectDialogComponent} from "../../../../dialog/info-select-dialog/info-select-dialog.component";
import {PatientService} from "../../../../services/patient.service";
import {GlobaldataService} from '../../../../services/globaldata.service';

@Component({
  selector: 'app-panel-title-add-input',
  templateUrl: './panel-title-add-input.component.html',
  styleUrls: ['./panel-title-add-input.component.scss']
})
export class PanelTitleAddInputComponent implements OnInit {


  @ViewChild('patientInfo') patientInfo

  panelSelections = this.panelService.panels;
  patientShow = false;
  step = 0;
  patientName = "";
  notes = [];
  colors = [];
  position = [];
  oldNotes: Note[];
  cur_panel;
  canFinish = false;

  notesTobeAdd = [];

  constructor(
    public panelService: PanelService,
    private storeService: StoreService,
    private noteService: NoteService,
    private diagnosticreportService: DiagnosticreportService,
    private conditionService: ConditionsService,
    private medicationService: MedicationorderService,
    private observationService: ObservationService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    private patientService: PatientService,
    private globaldataService: GlobaldataService
  ) {
  }

  ngOnInit() {

  }

  chooseStyle(id) {
    this.patientShow = true;
    this.oldNotes = this.noteService.panel_notes_map[id];
    if (this.oldNotes == undefined) {
      this.cur_panel = this.panelService.addPanel();
      this.step++;
      return;
    }
    for (let i = 0; i < this.oldNotes.length; i++) {
      let curnote = [];
      let curpos = [];
      curnote.push(this.oldNotes[i].cardOption.type);
      curnote.push(this.oldNotes[i].cardOption.data);
      curpos.push(this.oldNotes[i].top);
      curpos.push(this.oldNotes[i].left);
      this.position.push(curpos);
      this.colors.push(this.oldNotes[i].color);
      this.notes.push(curnote);
    }
    this.cur_panel = this.panelService.addPanel();
    this.step++;
  }

  async runPatientInfo() {
    let that = this;
    const {patientInfo: patientInfo1} = that;
    // @ts-ignore
    let patientId = patientInfo1.selectedPatient.id;
    let patientCd = patientInfo1.selectedPatient.code;
    let patientName = patientInfo1.selectedPatient.name;

    for (let i = 0; i < this.notes.length; i++) {
      let data;

      if (this.notes[i][0] == 'patient') {
        if (this.globaldataService.getDataSource() == "Id")
          data = await this.patientService.search(patientId);
        else {
          data = await this.patientService.search(patientName);
        }
        if (data) {
          data = {
            type: "patient",
            data: data.filter(x => x.id == patientId),
            parameters: {
              patientId: patientId
            }
          }
        }
      }
      if (this.notes[i][0] == 'observation') {
        data = await this.observationService.searchByPatientId(patientId, patientCd);
        if (data) {
          data = {
            type: "observation",
            data: data,
            parameters: {
              patientId: patientId,
              patientCode: patientCd
            }
          }
        }
      }
      if (this.notes[i][0] == 'medicationorder') {
        data = await this.medicationService.searchByPatientId(patientId);
        if (data) {
          data = {
            type: "medicationorder",
            // data: data.filter(x=>(x.identifier_system == that.notes[i][1][0].identifier_system && x.identifier_code == that.notes[i][1][0].identifier_code)),
            data: data,
            parameters: {
              patientId: patientId,
              medicationOrders: [data[0] ? data[0].MedicationOrder_id : '']
            }
          }
        }
      }
      if (this.notes[i][0] == 'diagnosticreport') {
        data = await this.diagnosticreportService.searchByPatientId(patientId);
        if (data) {
          data = {
            type: "diagnosticreport",
            // data: data.filter(x=>x.code == this.notes[i][1][0].code),
            data: data,
            parameters: {
              patientId: patientId,
              diagnosticReport: [data[0] ? data[0].id : '']
            }
          }
        }
      }
      if (this.notes[i][0] == 'condition') {
        data = await this.conditionService.searchByPatientId(patientId);
        let target = that.notes[i][1].map(x => x.code);
        if (data) {
          data = {
            type: "condition",
            // data: data.filter(x=>target.includes(x.code)),
            data: data,
            parameters: {
              patientId: patientId,
              conditions: [data[0] ? data[0].id : '']
            }
          }
        }
      }
      if (data) {
        this.notesTobeAdd.push(data);
      }

    }
    this.canFinish = true;
  }


  addAllNotes() {
    this.dialogRef.close({data: [this.cur_panel, this.notesTobeAdd, this.colors, this.position]});

    //add to update panel
    if (this.patientInfo.selectedPatient.name == "We do not have name record") {
      this.panelService.activePanel.title = this.patientInfo.selectedPatient.id;
    } else {
      this.panelService.activePanel.title = this.patientInfo.selectedPatient.name;
    }

    this.canFinish = false;
  }
}
