import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Documentreferences, DocumentreferenceService} from '../../../services/documentreference.service';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {Patient, PatientService} from '../../../services/patient.service';
import {GlobaldataService} from '../../../services/globaldata.service';

@Component({
  selector: 'app-documentreference-info',
  templateUrl: './documentreference-info.component.html',
  styleUrls: ['./documentreference-info.component.scss']
})
export class DocumentreferenceInfoComponent implements OnInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  patients: Patient[] = [];
  documentreferences: Documentreferences[] = [];

  hasSearch = false;

  public selectedPatient: Patient = this.globaldataService.getPatient()
  isWaiting: boolean;

  constructor(
    private documentreferenceService: DocumentreferenceService,
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
        this.documentreferences = await this.documentreferenceService.searchByPatientId(this.selectedPatient.id);
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
      type: 'documentreference',
      data: this.documentreferences.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        documentreference: this.documentreferences.filter(x => x.isSelected).map(x => x.id)
      }
    });
  }

  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient()
    this.isWaiting = true;
    this.documentreferences = await this.documentreferenceService.searchByPatientId(this.selectedPatient.id);
    this.isWaiting = false;
  }

}
