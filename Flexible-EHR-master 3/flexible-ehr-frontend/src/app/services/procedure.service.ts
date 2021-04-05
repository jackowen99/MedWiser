import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(
    private http: HttpClient
  ) {
  }


  async searchByPatientId(id: string): Promise<Procedures[]> {
    let result = [];
    result = await this.searchByPatientId_hapi(id);

    return result;
  }

  async searchByPatientId_hapi(id: string): Promise<Procedures[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/Procedure', {
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
        status: resource.status,
        procedure: resource.code ? resource.code.text : null,
        startDate: resource.performedPeriod? resource.performedPeriod.start : null,
        endDate: resource.performedPeriod? resource.performedPeriod.start : null,
        reference: resource.reasonReference? resource.reasonReference[0].display : null,
        // dateRecorded: resource.meta.lastUpdated,
        // clinicalStatus: resource.clinicalStatus?resource.clinicalStatus.coding[0].code : null,
        // onsetDateTime: resource.onsetDateTime,
        // verificationStatus: resource.verificationStatus?resource.verificationStatus.coding[0].code : null,
        // patient_name: resource.subject.reference,
        // code_system: resource.code.coding[0].system,
        // code: resource.code.coding[0].code,
        // code_name: resource.code.coding[0].display,
        // category: resource.category?resource.category[0].coding[0].display : null
      };
    });
  }

}

export interface Procedures {
  id: string,
  status: string,
  procedure: string,
  startDate: string,
  endDate: string,
  reference: string,
  // name: string,
  // dateRecorded: string,
  // clinicalStatus: string,
  // onsetDateTime: string,
  // verificationStatus: string,
  // patient_name: string,
  // code_system: string,
  // code: string,
  // code_name: string,
  // category: string,
  isSelected: boolean
}
