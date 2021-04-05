import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {promise} from 'selenium-webdriver';
import {Patient} from './patient.service';
import {MedicationOrder} from './medicationorder.service';
import {GlobaldataService} from './globaldata.service';
// @ts-ignore
import data from '../../assets/test.json';


@Injectable({
  providedIn: 'root'
})
export class LabtestService {

  constructor(
    public http: HttpClient,
    public globaldataService: GlobaldataService
  ) {
  }


  async searchById(id: string, cd: string): Promise<any> {
    let temp_displayEle = {
      elements: [{name: 'Basic_Metabolic_Panel', chooseEle: []},
        {name: 'CBC', chooseEle: []},
        {name: 'CBC_cells', chooseEle: []},
        {name: 'eGFT', chooseEle: []},
        {name: 'Troponin', chooseEle: []},
        {name: 'CPK', chooseEle: []},
        {name: 'LFT', chooseEle: []},
        {name: 'Urinalysis', chooseEle: []},
        {name: 'RBC', chooseEle: []},
        {name: 'ABG', chooseEle: []}]
    };

    if (id == '') {
      return temp_displayEle;
    }


    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Observation', {
      params: {
        patient: id,
        code: cd
      }
    }).toPromise();

    let temp_choosenEle = this.globaldataService.getChoosenEle();


    const entry = result.entry;
    // console.log(entry);
    entry.map(x => {
      let currecord = {
        name: x.resource.code.coding[0].display,
        cur: x.resource.valueQuantity.value,
        code: x.resource.valueQuantity.code,
        unit: x.resource.valueQuantity.unit
      };
      if (temp_choosenEle.Basic_Metabolic_Panel.includes(currecord.name)) {
        temp_displayEle.elements[0].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CBC.includes(currecord.name)) {
        temp_displayEle.elements[1].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CBC_cells.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[2].chooseEle.push(currecord);
      }
      if (temp_choosenEle.Troponin.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[3].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CPK.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[4].chooseEle.push(currecord);
      }
      if (temp_choosenEle.LFT.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[5].chooseEle.push(currecord);
      }
      if (temp_choosenEle.Urinalysis.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[6].chooseEle.push(currecord);
      }
      if (temp_choosenEle.RBC.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[7].chooseEle.push(currecord);
      }
      if (temp_choosenEle.ABG.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[8].chooseEle.push(currecord);
      }
    });
    /*
    let result = data;
    let temp_choosenEle = choose;
    console.log(this.globaldataService.getDisPlayEle());
    let temp_displayEle = {
      elements: [{name: 'Basic_Metabolic_Panel', chooseEle : []},
        {name: 'CBC', chooseEle : []},
        {name: 'CBC_cells', chooseEle : []},
        {name: 'eGFT', chooseEle : []},
        {name: 'Troponin', chooseEle : []},
        {name: 'CPK', chooseEle : []},
        {name: 'LFT', chooseEle : []},
        {name: 'Urinalysis', chooseEle : []},
        {name: 'RBC', chooseEle : []},
        {name: 'ABG', chooseEle : []}]
    };
    const entry = result.entry

    entry.map(x=>{
      let currecord = {
        name: x.resource.code.coding[0].display,
        cur: x.resource.valueQuantity.value,
        min: x.resource.referenceRange[0].low.value,
        max: x.resource.referenceRange[0].high.value,
        unit: x.resource.referenceRange[0].low.unit
      }
      if(temp_choosenEle.Basic_Metabolic_Panel.includes(currecord.name)){
        temp_displayEle.elements[0].chooseEle.push(currecord)
      }
      if(temp_choosenEle.CBC.includes(currecord.name)){
        temp_displayEle.elements[1].chooseEle.push(currecord)
      }
      if(temp_choosenEle.CBC_cells.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[2].chooseEle.push(currecord)
      }
      if(temp_choosenEle.Troponin.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[3].chooseEle.push(currecord)
      }
      if(temp_choosenEle.CPK.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[4].chooseEle.push(currecord)
      }
      if(temp_choosenEle.LFT.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[5].chooseEle.push(currecord)
      }
      if(temp_choosenEle.Urinalysis.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[6].chooseEle.push(currecord)
      }
      if(temp_choosenEle.RBC.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[7].chooseEle.push(currecord)
      }
      if(temp_choosenEle.ABG.includes(x.resource.code.coding[0].display)){
        temp_displayEle.elements[8].chooseEle.push(currecord)
      }
    });

     */
    return temp_displayEle;
  }

  async searchById_Hapi(id: string): Promise<any> {

    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/Observation', {
      params: {
        patient: id
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    let temp_choosenEle = this.globaldataService.getChoosenEle();
    let temp_displayEle = {
      elements: [{name: 'Basic_Metabolic_Panel', chooseEle: []},
        {name: 'CBC', chooseEle: []},
        {name: 'CBC_cells', chooseEle: []},
        {name: 'eGFT', chooseEle: []},
        {name: 'Troponin', chooseEle: []},
        {name: 'CPK', chooseEle: []},
        {name: 'LFT', chooseEle: []},
        {name: 'Urinalysis', chooseEle: []},
        {name: 'RBC', chooseEle: []},
        {name: 'ABG', chooseEle: []}]
    };
    const entry = result.entry;
    // console.log(entry);

    entry.map(x => {
      let currecord = {
        name: x.resource.code.coding[0].display,
        cur: x.resource.valueQuantity.value,
        min: x.resource.referenceRange ? x.resource.referenceRange[0].low.value : 'N/A',
        max: x.resource.referenceRange ? x.resource.referenceRange[0].high.value : 'N/A',
        unit: x.resource.referenceRange ? x.resource.referenceRange[0].low.unit : 'N/A'
      };
      if (temp_choosenEle.Basic_Metabolic_Panel.includes(currecord.name)) {
        temp_displayEle.elements[0].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CBC.includes(currecord.name)) {
        temp_displayEle.elements[1].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CBC_cells.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[2].chooseEle.push(currecord);
      }
      if (temp_choosenEle.Troponin.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[3].chooseEle.push(currecord);
      }
      if (temp_choosenEle.CPK.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[4].chooseEle.push(currecord);
      }
      if (temp_choosenEle.LFT.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[5].chooseEle.push(currecord);
      }
      if (temp_choosenEle.Urinalysis.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[6].chooseEle.push(currecord);
      }
      if (temp_choosenEle.RBC.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[7].chooseEle.push(currecord);
      }
      if (temp_choosenEle.ABG.includes(x.resource.code.coding[0].display)) {
        temp_displayEle.elements[8].chooseEle.push(currecord);
      }
    });

    return temp_displayEle;

  }
}

export interface Record {
  name: string;
  cur: string;
  min: string;
  max: string;
  unit: string
}
