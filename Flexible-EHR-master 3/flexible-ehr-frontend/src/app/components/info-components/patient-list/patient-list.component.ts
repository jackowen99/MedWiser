import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PatientInfoDialogComponent } from "../../../dialog/patient-info-dialog/patient-info-dialog.component";

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
    constructor(
        private matDialog: MatDialog,
      ) {
    
      }

    @Input() patients: PatientModel[];
    columns: string[] = ['name', 'gender', 'birthDate', 'country'];

    openPatientInfo(patient) {
        return this.matDialog.open(PatientInfoDialogComponent, {
            minWidth: "800px",
            minHeight: "600px",
            data: patient
        }).afterClosed().subscribe(async (allnotes) => {
        
        });
    }
}