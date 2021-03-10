import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GlobaldataService} from "../../../services/globaldata.service";
import {Patient, PatientService} from "../../../services/patient.service";
import {fromEvent} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observation, ObservationService} from "../../../services/observation.service";
import {InfoSelectDialogComponent} from "../../../dialog/info-select-dialog/info-select-dialog.component";
import {MatDialogRef} from "@angular/material/dialog";
import {SparklineDetails, SparklinesService} from "../../../services/sparklines.service";

@Component({
  selector: 'app-sparklines-info',
  templateUrl: './sparklines-info.component.html',
  styleUrls: ['./sparklines-info.component.scss']
})
export class SparklinesInfoComponent implements OnInit {

  @ViewChild("searchInput")
  searchInput: ElementRef<HTMLInputElement>;

  patients: Patient[] = [];
  sparklineDetails: SparklineDetails[];

  hasSearch = false;
  public selectedPatient: Patient = this.globaldataService.getPatient()
  isWaiting: boolean;

  constructor(public globaldataService: GlobaldataService,
              private patientService: PatientService,
              private sparklinesService: SparklinesService,
              private dialogRef:MatDialogRef<InfoSelectDialogComponent>,
              private sparkLinesService: SparklinesService,) {
  }

  ngOnInit() {
  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach(async (value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i]
        this.sparklineDetails = await this.sparklinesService.getLabTestDetails(this.selectedPatient.id)
      }
    })

  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      map(x => this.searchInput.nativeElement.value),
      debounceTime(200)
    ).subscribe(async (data) => {
      if (data) {
        this.patients = await this.patientService.search(data)
      } else {
        this.patients = []
      }

    })
  }

  add(){
    this.hasSearch = false;
    this.dialogRef.close({
      type:"sparklines",
      data:this.sparklineDetails,
      parameters:{
        patientId:this.selectedPatient.id,
        dataSource:this.selectedPatient.datasource,
        sparklineDetails:this.sparklineDetails
      }
    })


  }


  async search() {
    this.hasSearch = true;
    this.isWaiting = true
    this.selectedPatient = this.globaldataService.getPatient()
    this.sparklineDetails = await this.sparkLinesService.getLabTestDetails(this.selectedPatient.id);
    this.isWaiting = false;
  }

}
