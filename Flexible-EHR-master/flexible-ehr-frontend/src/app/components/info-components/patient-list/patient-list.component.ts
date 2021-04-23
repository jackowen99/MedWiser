import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PatientInfoDialogComponent } from "../../../dialog/patient-info-dialog/patient-info-dialog.component";
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {GlobaldataService} from '../../../services/globaldata.service';
import {PanelService} from '../../../services/panel.service';

export interface PatientModel {
    gender: string;
    birthDate: string;
    name: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
}

@Component({
    selector: 'patient-list',
    styleUrls: ['./patient-list.component.scss'],
    templateUrl: './patient-list.component.html',
})

export class PatientListComponent {
    selectedPatient: PatientModel;
    constructor(
        private matDialog: MatDialog,
        private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
        private globalDataService: GlobaldataService,
        private panelService: PanelService,
    ) {

    }

    @Input() patients: PatientModel[];
    columns: string[] = ['name', 'gender', 'birthDate', 'country', 'action'];

    openPatientInfo(patient) {
        //this.globalDataService.setPatient(patient.name);
        //this.selectedPatient = this.patients[];
        //this.globalDataService.setPatient(this.selectedPatient);
        return this.matDialog.open(PatientInfoDialogComponent, {
            minWidth: "800px",
            minHeight: "600px",
            data: patient
        }).afterClosed().subscribe(async (allnotes) => {

        });
    }
    

    addPatient(event: Event, patient) {
        event.stopPropagation();
        this.globalDataService.setPatient(patient);
       
        //this.globalDataService.setPatient(this.selectedPatient);
      }
}

//00000171-0929-2892-0000-00000001ec3a
//1580323 
//0000016f-a1db-e77f-0000-000000040c86