import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
    selector: 'patient-info-dialog',
    styleUrls: ['./patient-info-dialog.component.scss'],
    templateUrl: './patient-info-dialog.component.html',
})

export class PatientInfoDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
        
    }
}