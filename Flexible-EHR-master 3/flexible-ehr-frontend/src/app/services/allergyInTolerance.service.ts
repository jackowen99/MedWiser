import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class AllergyInToleranceService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }


  async searchByPatientId(id: string): Promise<AllergyInTolerance[]> {
    let result = [];
    result = await this.searchByPatientId_hapi(id);

    return result;
  }

  async searchByPatientId_hapi(id: string): Promise<AllergyInTolerance[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/AllergyIntolerance', {
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
      let totalReaction = ""

      resource.reaction[0].manifestation.map((displays) => {
        console.log(displays)
        totalReaction +=  displays.coding[0].display + " & "
      });


        return {
          id: resource.id,
          // dateRecorded: resource.meta.lastUpdated,
          // clinicalStatus: resource.clinicalStatus?resource.clinicalStatus.coding[0].code : null,
          // onsetDateTime: resource.onsetDateTime,
          // verificationStatus: resource.verificationStatus?resource.verificationStatus.coding[0].code : null,
          // patient_name: resource.subject.reference,
          // code_system: resource.code.coding[0].system,
          // code: resource.code.coding[0].code,
          // code_name: resource.code.coding[0].display,
          // category: resource.category?resource.category[0].coding[0].display : null
          category: resource.category ? resource.category : null,
          AllergicSubstance: resource.code ? (resource.code.coding ? resource.code.coding[0].display : null) : null,
          reaction: totalReaction.substring(0, totalReaction.length - 2)
        };
    });
  }

}

export interface AllergyInTolerance {
  id: string,
  name: string,
  // dateRecorded: string,
  // clinicalStatus: string,
  // onsetDateTime: string,
  // verificationStatus: string,
  // patient_name: string,
  // code_system: string,
  // code_name: string,
  category: string,
  AllergicSubstance: string,
  reaction: string,
  isSelected: boolean
}
