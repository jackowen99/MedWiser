import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentreferenceService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }


  async searchByPatientId(id: string): Promise<Documentreferences[]> {
    let result = [];
    result = await this.searchByPatientId_hapi(id);

    return result;
  }

  async searchByPatientId_hapi(id: string): Promise<Documentreferences[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/DocumentReference', {
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
    console.log(entry)
    return entry.map((data) => {
      const resource = data.resource;

      let attachmentDecoded;
      if(resource.content){
        attachmentDecoded = atob(resource.content[0].attachment.data);
        if(attachmentDecoded[attachmentDecoded.length - 1] == "=" && attachmentDecoded[attachmentDecoded.length - 2] == "="){
          //needs decoded again. HAPI data sometimes had double encoded text
          attachmentDecoded = atob(attachmentDecoded);
        }
      }
       

      return {
        id: resource.id,
        clinicalStatus: resource.docStatus? resource.docStatus : null,
        type: resource.type ? resource.type : null,
        DateTime: resource.date,
        category: resource.category? resource.category[0].coding[0].display : null,
        attachment: attachmentDecoded? attachmentDecoded : null
        // clinicalStatus: resource.
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

export interface Documentreferences {
  id: string,
  clinicalStatus: string,
  type: any,
  DateTime: string,
  category: string,
  isSelected: boolean,
  attachment: any

}
