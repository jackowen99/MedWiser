import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Patient, PatientService} from '../../../services/patient.service';
import {AddService} from '../../../services/add.service';
import {MatAutocompleteSelectedEvent, MatDialogRef, MatTableDataSource} from '@angular/material';
import {InfoSelectDialogComponent} from '../../../dialog/info-select-dialog/info-select-dialog.component';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Vital, VitalService} from '../../../services/vital.service';
import {LabtestsShowComponent} from '../labtests-show/labtests-show.component';
import {GlobaldataService} from '../../../services/globaldata.service';

interface Choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-vital-info',
  templateUrl: './vital-info.component.html',
  styleUrls: ['./vital-info.component.scss']
})
export class VitalInfoComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;


  patients: Patient[] = [];
  vitals: Vital[] = [];
  hasSearch = false;
  consolidatedVitals: any[];

  public selectedPatient: Patient = this.globaldataService.getPatient();
  isWaiting: boolean;

  constructor(
    private patientService: PatientService,
    private vitalService: VitalService,
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
        this.vitals = await this.vitalService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
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
      type: 'vital',
      data: this.consolidatedVitals.filter(x => x.isSelected),
      parameters: {
        patientId: this.selectedPatient.id,
        dataSource: this.selectedPatient.datasource,
        vitals: this.consolidatedVitals.filter(x => x.isSelected).map(x => x.id)
      }
    });


  }

  consolidateVitals(){
    this.consolidatedVitals = [];
    for(let i = 0; i < this.vitals.length; i++){
      let addedToExisting = false;
      for(let j = 0; j < this.consolidatedVitals.length; j++){
        if(this.vitals[i].code == this.consolidatedVitals[j].code){
          if(this.checkComponent(this.vitals[i]) == true){
            this.consolidatedVitals[j].values.push(this.vitals[i].component[0].valueQuantity.value);
            this.consolidatedVitals[j].secondaryValues.push(this.vitals[i].component[1].valueQuantity.value);
          }
          else{
            this.consolidatedVitals[j].values.push(this.vitals[i].value);
          }
          
          this.consolidatedVitals[j].times.push(this.vitals[i].time);
          addedToExisting = true;
        }
      }

      if(!addedToExisting){
        var newVital;
        if(this.checkComponent(this.vitals[i]) == true){
          let newValue;
          let subValue;
          let newUnit = "";
          if(this.vitals[i].code == "Blood Pressure"){
            newValue = this.vitals[i].component[0].valueQuantity.value;
            subValue = this.vitals[i].component[1].valueQuantity.value;
            newUnit = this.vitals[i].component[0].valueQuantity.unit;
          }
          newVital = {
            code: this.vitals[i].code,
            times: [this.vitals[i].time],
            unit: newUnit,
            values: [newValue],
            secondaryValues: [subValue],
            isSelected: false
          }
        }
        else{
          newVital = {
            code: this.vitals[i].code,
            times: [this.vitals[i].time],
            unit: this.vitals[i].unit,
            values: [this.vitals[i].value],
            secondaryValues: [""],
            isSelected: false
          }
        }
        this.consolidatedVitals.push(newVital);
        
      }
    }
    
  }

  checkComponent(vi: any): boolean{
    if(vi.component){
      return true;
    }
    return false;
  }

  async search() {
    this.hasSearch = true;
    this.selectedPatient = this.globaldataService.getPatient();
    this.isWaiting = true;
    this.vitals = await this.vitalService.searchByPatientId(this.selectedPatient.id, this.selectedPatient.code);
    this.consolidateVitals();
    this.isWaiting = false;
  }
}
