import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Patient, PatientService} from '../../../services/patient.service';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {AddService} from '../../../services/add.service';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {PanelService} from '../../../services/panel.service';
import {GlobaldataService} from '../../../services/globaldata.service';
import {LabtestsShowComponent} from '../labtests-show/labtests-show.component';
import {PanelComponent} from '../../panel/panel.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  @Input() isAddPatient: boolean;

  patients: Patient[] = [];

  public selectedPatient: Patient = null;


  constructor(
    private patientService: PatientService,
    private addService: AddService,
    private dialogRef: MatDialogRef<InfoSelectDialogComponent>,
    private panelService: PanelService,
    private globalDataService: GlobaldataService,
    public globaldataService: GlobaldataService
  ) {

  }

  ngOnInit() {

  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    $event.source.options.forEach((value, i) => {
      if (value.selected) {
        this.selectedPatient = this.patients[i];
        this.globalDataService.setPatient(this.selectedPatient);
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

  addPatient() {
    this.dialogRef.close({
      type: 'patient',
      data: this.selectedPatient,
      parameters: {
        patientId: this.selectedPatient.id,
        patientName: this.selectedPatient.name,
        dataSource: this.globalDataService.getDataSource(),
      }
    });
    if (this.selectedPatient.name == 'We do not have name record') {
      this.panelService.activePanel.title = this.selectedPatient.id;
    } else {
      this.panelService.activePanel.title = this.selectedPatient.name;
    }
  }


}
