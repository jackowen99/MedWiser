import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {


  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {

  }

  async searchByPatientId(id: string, cd: string): Promise<Observation[]> {
    // let result = [];
    if (this.globalData.getDataSource() == 'Open') {
      return await this.searchByPatientId_open(id, cd);
    } else if (this.globalData.getDataSource() == 'Hapi') {
      return await this.searchByPatientId_hapi(id);
    } else {
      return await this.searchByPatientId_school(id);
    }
    // return result;
  }

  async searchinit(id: string, cd: string, dataSource: string): Promise<Observation[]> {
    // let result = [];
    if (dataSource == 'Open') {
      return await this.searchByPatientId_open(id, cd);
    } else if (dataSource == 'Hapi') {
      return await this.searchByPatientId_hapi(id);
    } else {
      return await this.searchByPatientId_school(id);
    }
    // return result;
  }

  //school server
  async searchByPatientId_school(id: string): Promise<Observation[]> {
    const result = await this.http.get<any>(`http://130.49.206.139:8080/omoponfhir3/fhir/Observation?`, {
      headers: {
        'Authorization': 'Basic Y2xpZW50X29tb3A6c2VjcmV0OjEyMzQ1'
      },
      params: {
        patient: id,
        _count: "10000"
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    const entry = result.entry;

    if (result.total == 0 || !entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        status: resource.status,
        category: resource.category && resource.category[0].coding[0].display || null,
        code: resource.code && resource.code.coding[0].display || null,
        // value: resource.valueQuantity.value,
        // unit: resource.valueQuantity.unit
        value: null,
        unit: null
      };
    });

    // return [{
    //   id: entry.id,
    //   status: entry.status,
    //   category: entry.category && entry.category[0].coding[0].display || null,
    //   code: entry.code && entry.code.coding[0].display || null,
    //   value: entry.valueQuantity.value,
    //   unit: entry.valueQuantity.unit,
    //   min: 0,
    //   max: 0,
    //   isSelected: false
    // }];
  }


  async searchByPatientId_hapi(id: string): Promise<Observation[]> {
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/Observation', {
      params: {
        patient: id
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    const entry = result.entry;
    if (!entry) {
      return [];
    }


    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        status: resource.status,
        category: resource.category && resource.category[0].coding[0].display || null,
        code: resource.code && resource.code.coding[0].display || null,
        value: resource.valueQuantity ? resource.valueQuantity.value : null,
        unit: resource.valueQuantity ? resource.valueQuantity.unit : null
      };
    });
  }

  async searchByPatientId_open(id: string, cd: string): Promise<Observation[]> {
    if (cd == '' || cd == null) {
      return [];
    }
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Observation', {
      params: {
        patient: id,
        code: cd
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    const entry = result.entry; //get the result of the get request and read the data
    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        status: resource.status,
        category: resource.category.coding[0].display && resource.category.text || null,
        code: resource.code && resource.code.coding[0].display || null,
        value: resource.valueQuantity.value,
        unit: resource.valueQuantity.unit,
        min: resource.referenceRange[0].low.value,
        max: resource.referenceRange[0].high.value,
        dataSource: 'Open',
        patientCode: cd,
      };
    });
  }


}

export interface Observation {
  id: string,
  status: string
  category: string
  code: string
  value: string
  unit: string
  min: number
  max: number
  isSelected: boolean
}
