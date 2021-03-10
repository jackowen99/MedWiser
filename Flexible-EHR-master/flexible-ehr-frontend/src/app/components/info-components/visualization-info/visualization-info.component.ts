import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Patient, PatientService} from '../../../services/patient.service';
import {MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {GlobaldataService} from "../../../services/globaldata.service";


@Component({
  selector: 'app-visualization-info',
  templateUrl: './visualization-info.component.html',
  styleUrls: ['./visualization-info.component.scss']
})
export class VisualizationInfoComponent implements OnInit {

  @ViewChild("searchInput")
  searchInput: ElementRef<HTMLInputElement>;

  patients: Patient[] = [];

  hasSearch = false;
  public selectedPatient: Patient = this.globaldataService.getPatient()
  public isSearched = false;
  public visualURL: string;

  constructor(
    private patientService: PatientService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    private router: Router,
    public globaldataService: GlobaldataService
  ) {
  }

  ngOnInit() {
  }


  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach((value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i]
        this.visualURL = `http://localhost:3000/${this.selectedPatient.id} `
        this.isSearched = true;
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

  async search() {
    this.selectedPatient = this.globaldataService.getPatient()
    this.visualURL = `http://localhost:3000/${this.selectedPatient.id} `
    this.isSearched = true;
    this.hasSearch = true;
  }

// <a href="http://localhost:3000/" target="_blank"> View Visualization</a>


}
