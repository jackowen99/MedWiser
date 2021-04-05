import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Patient, PatientService} from '../../../services/patient.service';
import {AddService} from '../../../services/add.service';
import {MatAutocompleteSelectedEvent, MatDialogRef, MatTableDataSource} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Observation, ObservationService} from '../../../services/observation.service';
import {LabtestsShowComponent} from '../labtests-show/labtests-show.component';
import {GlobaldataService} from '../../../services/globaldata.service';

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-observation-info',
  templateUrl: './observation-info.component.html',
  styleUrls: ['./observation-info.component.scss']
})
export class ObservationInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;


  patients: Patient[] = [];
  observations: Observation[] = [];
  hasSearch = false;

  public selectedPatient: Patient = this.globaldataService.getPatient();
  isWaiting: boolean;

  constructor(
    private patientService: PatientService,
    private observationService: ObservationService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    private labtestsShowComponent: LabtestsShowComponent,
    public globaldataService: GlobaldataService,
  ) {

  }

  ngOnInit() {

  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach(async (value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i];
        this.observations = await this.observationService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
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
      type: 'observation',
      data: this.observations.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        dataSource: this.selectedPatient.datasource,
        observations: this.observations.filter(x => x.isSelected).map(x => x.id)
      }
    });


  }


  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient();
    this.isWaiting = true;
    this.observations = await this.observationService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
    this.isWaiting = false;
  }
}
