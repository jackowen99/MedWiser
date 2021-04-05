import {Injectable} from '@angular/core';
import {Note, NoteService} from './note.service';
import {HttpService} from './http.service';
import {PanelService} from './panel.service';
import {PatientService} from './patient.service';
import {ObservationService} from './observation.service';
import {MedicationorderService} from './medicationorder.service';
import {ConditionsService} from './conditions.service';
import {DiagnosticreportService} from './diagnosticreport.service';
import {LabtestService} from './labtest.service';
import {GlobaldataService} from './globaldata.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  username: string = '';

  user: any = null;

  constructor(
    private noteService: NoteService,
    private httpService: HttpService,
    private panelService: PanelService,
    private patientService: PatientService,
    private observationService: ObservationService,
    private medicationService: MedicationorderService,
    private conditionService: ConditionsService,
    private diagnosticreportService: DiagnosticreportService,
    private labtestService: LabtestService,
    private globaldataService: GlobaldataService
  ) {

  }

  async getNotesForUser() {
    let username = sessionStorage.getItem('username');
    this.username = username;

    this.user = await this.httpService.get(`users/${username}`);
    let data = this.user.data.data;
    for (let i in data) {
      if (data[i].length == 0) continue
      this.globaldataService.dataSource.push(data[i][0].cardOption.parameters.dataSource);
    }
    this.processUserData(this.user.data.data);
    this.noteService.panel_notes_map = this.user.data.data;
    this.panelService.panels = this.user.data.panels;
    return this.user;
  }

  private async processUserData(data) {
    for (let i of Object.keys(data)) {
      // @ts-ignore
      let key = i - 1;
      for (let note of data[key + 1]) {
        switch (note.cardOption.type) {
          case 'patient':
            // @ts-ignore
            note.cardOption.data = await this.patientService.searchInit(note.cardOption.parameters.patientName, this.globaldataService.dataSource[key]);
            this.globaldataService.patient[key] = note.cardOption.data[0];
            break;
          case 'observation':
            const parameters = note.cardOption.parameters;
            const observationIds = new Set(parameters.observations);
            note.cardOption.data = (await this.observationService.searchinit(parameters.patientId, note.cardOption.data[0].patientCode, this.globaldataService.dataSource[key])).filter(x => observationIds.has(x.id));
            break;
          case 'medicationorder':
            const parameters1 = note.cardOption.parameters;
            const medicationIds = new Set(parameters1.medicationOrders);
            note.cardOption.data = (await this.medicationService.searchinit(parameters1.patientId, this.globaldataService.dataSource[key])).filter(x => medicationIds.has(x.MedicationOrder_id));
            break;
          case 'diagnosticreport':
            const parameters2 = note.cardOption.parameters;
            const diagnosticreportIds = new Set(parameters2.diagnosticReport);
            note.cardOption.data = (await this.diagnosticreportService.searchinit(parameters2.patientId, this.globaldataService.dataSource[key])).filter(x => diagnosticreportIds.has(x.id));
            break;
          case 'condition':
            const parameters3 = note.cardOption.parameters;
            const conditionIds = new Set(parameters3.conditions);
            note.cardOption.data = (await this.conditionService.searchinit(parameters3.patientId, this.globaldataService.dataSource[key])).filter(x => conditionIds.has(x.id));
            break;

        }
      }
    }
  }

  async saveNotesForUser() {
    return this.httpService.patch(`users/${this.user.id}`, {
      panels: this.panelService.panels,
      data: this.noteService.panel_notes_map
    }).then(
      () => {

        Swal.fire({
          title: 'Data has been saved',
          showConfirmButton: false,
          // @ts-ignore
          type: 'success',
          timer: 1500
        });
      }
    );
  }

}


export interface User {
  id: number
  name: string,
  password: string,
  data: any
}
