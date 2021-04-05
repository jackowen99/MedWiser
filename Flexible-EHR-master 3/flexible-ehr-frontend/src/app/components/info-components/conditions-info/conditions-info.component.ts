import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Conditions, ConditionsService} from '../../../services/conditions.service';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {Patient, PatientService} from '../../../services/patient.service';
import {GlobaldataService} from "../../../services/globaldata.service";

@Component({
  selector: 'app-conditions-info',
  templateUrl: './conditions-info.component.html',
  styleUrls: ['./conditions-info.component.scss']
})
export class ConditionsInfoComponent implements OnInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  patients: Patient[] = [];
  conditions: Conditions[] = [];

  hasSearch = false;

  public selectedPatient: Patient = this.globaldataService.getPatient()
  isWaiting: Boolean;

  constructor(
    private conditionService: ConditionsService,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    public globaldataService: GlobaldataService,
  ) {
  }

  ngOnInit() {
  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach(async (value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i];
        this.conditions = await this.conditionService.searchByPatientId(this.selectedPatient.id);
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
      type: 'condition',
      data: this.conditions.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        conditions: this.conditions.filter(x => x.isSelected).map(x => x.id)
      }
    });
  }

  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient()
    this.isWaiting = true
    this.conditions = await this.conditionService.searchByPatientId(this.selectedPatient.id);
    this.isWaiting = false
  }

}
