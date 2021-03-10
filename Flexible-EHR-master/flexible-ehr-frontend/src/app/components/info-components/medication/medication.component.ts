import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Medications, MedicationService} from '../../../services/medication.service';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {Patient, PatientService} from '../../../services/patient.service';
import {GlobaldataService} from '../../../services/globaldata.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  patients: Patient[] = [];
  medications: Medications[] = [];

  hasSearch = false;

  public selectedPatient: Patient = this.globaldataService.getPatient()
  isWaiting: boolean;

  constructor(
    private medicationService: MedicationService,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    public globaldataService: GlobaldataService
  ) {
  }

  ngOnInit() {

  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach(async (value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i];
        this.medications = await this.medicationService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
      }
    });

  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map(x => this.searchInput.nativeElement.value),
      debounceTime(200)
    ).subscribe(async (data) => {
      if (data) {
        this.patients = await this.patientService.search(data);
      } else {
        this.patients = [];
      }

    });
  }

  add() {
    this.hasSearch = false;
    this.dialogRef.close({
      type: 'medication',
      data: this.medications.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        medications: this.medications.filter(x => x.isSelected).map(x => x.code)
      }
    });
  }

  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient()
    this.isWaiting = true;
    this.medications = await this.medicationService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
    this.isWaiting = false;
  }

}
