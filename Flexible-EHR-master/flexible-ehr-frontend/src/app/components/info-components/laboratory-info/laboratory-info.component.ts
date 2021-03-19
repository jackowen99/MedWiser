import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Patient, PatientService} from '../../../services/patient.service';
import {AddService} from '../../../services/add.service';
import {MatAutocompleteSelectedEvent, MatDialogRef, MatTableDataSource} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Laboratory, LaboratoryService} from '../../../services/laboratory.service';
import {LabtestsShowComponent} from '../labtests-show/labtests-show.component';
import {GlobaldataService} from '../../../services/globaldata.service';

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-laboratory-info',
  templateUrl: './laboratory-info.component.html',
  styleUrls: ['./laboratory-info.component.scss']
})
export class LaboratoryInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;


  patients: Patient[] = [];
  labs: Laboratory[] = [];
  hasSearch = false;
  consolidatedLabs: any[];

  public selectedPatient: Patient = this.globaldataService.getPatient();
  isWaiting: boolean;

  constructor(
    private patientService: PatientService,
    private laboratoryService: LaboratoryService,
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
        this.labs = await this.laboratoryService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
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
      type: 'laboratory',
      data: this.consolidatedLabs.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        dataSource: this.selectedPatient.datasource,
        labs: this.consolidatedLabs.filter(x => x.isSelected).map(x => x.id)
      }
    });


  }

  consolidateLabs(){
    this.consolidatedLabs = [];
    for(let i = 0; i < this.labs.length; i++){
      let addedToExisting = false;
      for(let j = 0; j < this.consolidatedLabs.length; j++){
        if(this.labs[i].code == this.consolidatedLabs[j].code){
          if(this.checkText(this.labs[i]) == true){
            this.consolidatedLabs[j].values.push(this.labs[i].textValue);
            this.consolidatedLabs[j].secondaryValues.push("");
          }
          else{

          
            this.consolidatedLabs[j].values.push(this.labs[i].value);
          }
          
          this.consolidatedLabs[j].times.push(this.labs[i].time);
          addedToExisting = true;
        }
      }

      if(!addedToExisting){
        var newLaboratory;
        if(this.checkText(this.labs[i]) == true){
          newLaboratory = {
            code: this.labs[i].code,
            times: [this.labs[i].time],
            unit: this.labs[i].unit,
            values: [this.labs[i].textValue],
            secondaryValues: [""],
            hasText: this.labs[i].hasText,
            isSelected: false
          }
        }
        else{

        
        
          newLaboratory = {
            code: this.labs[i].code,
            times: [this.labs[i].time],
            unit: this.labs[i].unit,
            values: [this.labs[i].value],
            secondaryValues: [""],
            hasText: this.labs[i].hasText,
            isSelected: false
          }
        }
        this.consolidatedLabs.push(newLaboratory);
        
      }
    }
    
  }

  checkText(vi: any): boolean{
    if(vi.textValue){
      return true;
    }
    return false;
  }

  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient();
    this.isWaiting = true;
    this.labs = await this.laboratoryService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
    this.consolidateLabs();
    this.isWaiting = false;
  }
}
