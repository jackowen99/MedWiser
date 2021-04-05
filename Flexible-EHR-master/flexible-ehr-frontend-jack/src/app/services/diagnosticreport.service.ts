import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';
import {Patient} from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticreportService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }


  async searchByPatientId(id: string): Promise<Report[]> {
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

  async searchinit(id: string, dataSource: string): Promise<Report[]> {
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

  async searchByPatientId_school(id: string): Promise<Report[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/DiagnosticReport?', {
      params: {
        patient: id,
        _count: "10000"
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    console.log(result);
    const entry = result.entry; //get the result of the get request and read the data

    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        status: resource.status,
        effectiveDate: resource.effectiveDateTime,
        issuedTime: resource.issued,
        code: resource.code.text,
        subject_name: resource.subject.reference || 'N/A',
        performer_name: resource.encounter.reference || 'N/A',
        identifier_coding_system: resource.category[0].coding[0].system,
        identifier_coding_value: resource.category[0].coding[0].display,
        identifier_coding_code: resource.category[0].coding[0].code
      };
    });
  }

  async searchByPatientId_hapi(id: string): Promise<Report[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/DiagnosticReport?', {
      params: {
        patient: id
      }
    }).toPromise().catch(e => {
      console.log(e)
    });

    const entry = result.entry; //get the result of the get request and read the data

    // console.log(result)

    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;

      return {
        id: resource.id,
        status: resource.status,
        effectiveDate: resource.effectiveDateTime,
        issuedTime: resource.issued,
        code: resource.code.text,
        subject_name: resource.subject.reference || 'N/A',
        performer_name: resource.encounter.reference || 'N/A',
        identifier_coding_system: resource.category[0].coding[0].system,
        identifier_coding_value: resource.category[0].coding[0].display,
        identifier_coding_code: resource.category[0].coding[0].code
      };
    });
  }


  async searchByPatientId_open(id: string): Promise<Report[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/DiagnosticReport', {
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
        status: resource.status,
        effectiveDate: resource.effectiveDateTime,
        issuedTime: resource.issued,
        code: resource.code ? resource.code.text : 'N/A',
        subject_name: resource.subject ? resource.subject.display : 'N/A',
        performer_name: resource.performer ? resource.performer.display : 'N/A',
        identifier_coding_system: resource.identifier ? resource.identifier[0].system : 'N/A',
        identifier_coding_value: resource.identifier ? resource.identifier[0].values : 'N/A',
        identifier_coding_code: resource.identifier ? resource.identifier[0].type.coding[0].code : 'N/A'
      };
    });
  }

  async searchAndCompare(id: string, target: string): Promise<Report[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/DiagnosticReport', {
      params: {
        patient: id
      }
    }).toPromise()
      .catch(e => {
        console.log(e)
      });
    const entry = result.entry; //get the result of the get request and read the data
    if (!entry) {
      return [];
    }

    return entry.map((data) => {
      const resource = data.resource;
      if (resource.identifier[0].type.coding[0].code == target) {
        return {
          id: resource.id,
          status: resource.status,
          effectiveDate: resource.effectiveDateTime,
          issuedTime: resource.issued,
          code: resource.code.text,
          subject_name: resource.subject.display,
          performer_name: resource.performer.display,
          identifier_coding_system: resource.identifier[0].system,
          identifier_coding_value: resource.identifier[0].values,
          identifier_coding_code: resource.identifier[0].type.coding[0].code
        };
      } else {
        return [];
      }
    });
  }

}

export interface Report {
  id: string,
  status: string,
  effectiveDate: string,
  issuedTime: string,
  code: string,
  subject_name: string,
  performer_name: string,
  identifier_coding_system: string,
  identifier_coding_value: string,
  identifier_coding_code: string,
  isSelected: boolean
}
