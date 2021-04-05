import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }


  async searchByPatientId(id: string): Promise<Conditions[]> {
    let result = [];
    if (this.globalData.getDataSource() == 'Open') {
      result = await this.searchByPatientId_open(id);
    } else if (this.globalData.getDataSource() == 'Id') {
      result = await this.searchByPatientId_school(id);
    } else {
      result = await this.searchByPatientId_hapi(id);
    }
    return result;
  }

  async searchinit(id: string, dataSource: string): Promise<Conditions[]> {
    let result = [];
    if (dataSource == 'Open') {
      result = await this.searchByPatientId_open(id);
    } else if (dataSource == 'Id') {
      result = await this.searchByPatientId_school(id);
    } else {
      result = await this.searchByPatientId_hapi(id);
    }
    return result;
  }

  async searchByPatientId_school(id: string): Promise<Conditions[]> {
    if (id == '' || id == null) {
      return [];
    }

    const result = await this.http.get<any>(`http://130.49.206.139:8080/omoponfhir3/fhir/Condition?`, {
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

    const entry = result.entry; //get the result of the get request and read the data
    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        dateRecorded: resource.onsetDateTime,
        clinicalStatus: 'N/A',
        onsetDateTime: resource.onsetDateTime,
        verificationStatus: 'N/A',
        patient_name: resource.subject.reference,
        code_system: resource.code.coding[0].system,
        code: resource.code.coding[0].code,
        code_name: resource.code.coding[0].display,
        category: resource.category[0].coding[0].display
      };
    });
  }


  async searchByPatientId_hapi(id: string): Promise<Conditions[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/Condition', {
      params: {
        patient: id
      }
    }).toPromise();
    const entry = result.entry; //get the result of the get request and read the data
    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        dateRecorded: resource.meta.lastUpdated,
        clinicalStatus: resource.clinicalStatus ? resource.clinicalStatus.coding[0].code : null,
        onsetDateTime: resource.onsetDateTime,
        verificationStatus: resource.verificationStatus ? resource.verificationStatus.coding[0].code : null,
        patient_name: resource.subject.reference,
        code_system: resource.code.coding[0].system,
        code: resource.code.coding[0].code,
        code_name: resource.code.coding[0].display,
        category: resource.category ? resource.category[0].coding[0].display : null
      };
    });
  }

  async searchByPatientId_open(id: string): Promise<Conditions[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Condition', {
      params: {
        patient: id
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
        dateRecorded: resource.dateRecorded,
        clinicalStatus: resource.clinicalStatus,
        onsetDateTime: resource.onsetDateTime,
        verificationStatus: resource.verificationStatus,
        patient_name: resource.patient ? resource.patient.display : 'N/A',
        code_system: resource.code ? resource.code.coding[0].system : 'N/A',
        code: resource.code ? resource.code.coding[0].code : 'N/A',
        code_name: resource.code ? resource.code.text : 'N/A',
        category: resource.category ? resource.category.text : 'N/A'
      };
    });
  }

  // async searchAndCompare(id: string, target: string): Promise<Conditions[]> {
  //   if (id == '' || id == null) {
  //     return [];
  //   }
  //   const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Condition', {
  //     params: {
  //       patient: id
  //     }
  //   }).toPromise();
  //   const entry = result.entry; //get the result of the get request and read the data
  //   if (!entry) {
  //     return [];
  //   }
  //
  //   return entry.map((data) => {
  //     const resource = data.resource;
  //
  //     return {
  //       id: resource.id,
  //       dateRecorded: resource.dateRecorded,
  //       clinicalStatus: resource.clinicalStatus,
  //       onsetDateTime: resource.onsetDateTime,
  //       verificationStatus: resource.verificationStatus,
  //       patient_name: resource.patient.display,
  //       code_system: resource.code.coding[0].system,
  //       code: resource.code.coding[0].code,
  //       code_name: resource.code.text,
  //       category: resource.category.text
  //     };
  //   });
  // }
}

export interface Conditions {
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
