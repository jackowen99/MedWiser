import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';
import {Observation} from './observation.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }


  async searchByPatientId(id: string, cd: string): Promise<Medications[]> {
    // let result = [];
    if (this.globalData.getDataSource() == 'Open') {
      // return await this.searchByPatientId_open(id, cd);
      console.log("wating")
    } else if (this.globalData.getDataSource() == 'Hapi') {
      return await this.searchByPatientId_hapi(id);
    } else {
      return await this.searchByPatientCode_school(cd);
    }
    // return result;
  }

  async searchByPatientId_hapi(id: string): Promise<Medications[]> {
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


    // return entry.map((data) => {
    //   const resource = data.resource;
    //
    //   return {
    //     id: resource.id,
    //     status: resource.status,
    //     category: resource.category && resource.category[0].coding[0].display || null,
    //     code: resource.code && resource.code.coding[0].display || null,
    //     value: resource.valueQuantity?resource.valueQuantity.value : null,
    //     unit: resource.valueQuantity?resource.valueQuantity.unit : null
    //   };
    // });
  }

  //school server
  async searchByPatientCode_school(code: string): Promise<Medications[]> {
    const result = await this.http.get<any>(`http://130.49.206.139:8080/omoponfhir3/fhir/Observation?`, {
      headers: {
        'Authorization': 'Basic Y2xpZW50X29tb3A6c2VjcmV0OjEyMzQ1'
      },
      params:{
        code:code,
        _count: "10000"
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    const entry = result.entry;

    if (result.total == 0 || !entry) {
      return [];
    }



    // return entry.map((data) => {
    //   const resource = data.resource;
    //
    //   return {
    //     id: resource.id,
    //     status: resource.status,
    //     category: resource.category && resource.category[0].coding[0].display || null,
    //     code: resource.code && resource.code.coding[0].display || null,
    //     value: null,
    //     unit: null
    //   };
    // });
  }

}

export interface Medications {
  id: string,
  name: string,
  dateRecorded: string,
  clinicalStatus: string,
  onsetDateTime: string,
  verificationStatus: string,
  patient_name: string,
  code_system: string,
  code: string,
  code_name: string,
  category: string,
  isSelected: boolean
}
