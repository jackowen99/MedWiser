import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {

  }

  datasource_temp: string;

  async search(name: string): Promise<Patient[]> {
    let result = [];
    this.datasource_temp = this.globalData.getDataSource();
    if (this.globalData.getDataSource() == 'Open') {
      result = await this.searchOpen(name);
    } else if (this.globalData.getDataSource() == 'Id') {
      result = await this.searchSchoolbyId(name);
    } else {
      let search = name.split(' ');

      result = await this.searchHapi(search[0]);
    }

    return result;
  }

  async searchInit(name: string, dataSource: string): Promise<Patient[]> {
    let result = [];
    this.datasource_temp = this.globalData.getDataSource();
    if (dataSource == 'Open') {
      result = await this.searchOpen(name);
    } else if (dataSource == 'Id') {
      result = await this.searchSchoolbyId(name);
    } else {
      let search = name.split(' ');

      result = await this.searchHapi(search[0]);
    }

    return result;
  }


  // test school server search by id

  async searchSchoolbyId(id: string): Promise<Patient[]> {
    const result = await this.http.get<any>(`http://130.49.206.139:8080/omoponfhir3/fhir/Patient/${id}`, {
      headers: {
        'Authorization': 'Basic Y2xpZW50X29tb3A6c2VjcmV0OjEyMzQ1'
      }
    })
      .toPromise()
      .catch(e => {
        console.log(e)
      });
    const entry = result;
    if (!entry) {
      return [];
    }
    const patients: Patient[] = [{
      id: entry.id,
      name: entry.id,
      email: 'N/A',
      gender: entry.gender,
      birthDate: entry.birthDate || 'N/A',
      code: 'N/A',
      datasource: this.datasource_temp
    }];
    //   entry.map(x => {
    //   const resource = x.resource;
    //   return {
    //     id: resource.id,
    //     name: 'We do not have name record',
    //     email: 'N/A',
    //     gender: 'N/A',
    //     birthDate: resource.birthDate || 'N/A',
    //     code: 'Hapi_have_no_code',
    //     datasource: this.datasource_temp
    //   };
    // });
    return patients;
  }


  // another url
  async searchHapi(name: string): Promise<Patient[]> {
    const result = await this.http.get<any>('http://hapi.fhir.org/baseR4/Patient', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        name
      }
    })
      .toPromise()
      .catch(e => {
        console.log(e)
      });
    if (!result) {
      return
    }
    const entry = result.entry;
    if (!entry) {
      return [];
    }
    const patients: Patient[] = entry.map(x => {
      const resource = x.resource;
      const _name = resource.name[0];

      // console.log(resource.name);

      return {
        id: resource.id,
        name: (_name.given ? _name.given[0] : 'N/A') + ' ' + _name.family,
        email: this.parseEmail(resource.telecom) || 'N/A',
        gender: resource.gender || 'N/A',
        birthDate: resource.birthDate || 'N/A',
        code: 'Hapi_have_no_code',
        datasource: this.datasource_temp
      };
    });
    return patients;
  }

  async searchOpen(name: string): Promise<Patient[]> {
    var words = name.split(' ');
    const given = words[0];
    const family = words.length > 1 ? words[words.length - 1] : '';
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Patient', {
      params: {
        family,
        given
      }
    })
      .toPromise()
      .catch(e => {
        console.log(e)
      });
    if (!result) {
      return
    }

    const entry = result.entry;
    return entry.map(x => {
      if (x.resource.resourceType == 'OperationOutcome') {
        return [];
      }
      const resource = x.resource;
      return {
        id: resource.id,
        name: resource.name[0].text,
        email: this.parseEmail(resource.telecom),
        gender: resource.gender || 'N/A',
        birthDate: resource.birthDate || 'N/A',
        code: this.parseCode(resource.extension),
        datasource: this.datasource_temp
      };
    });
  }


  async getById(id: string) {
    const resource = await this.http.get<any>(`https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Patient/${id}`)
      .toPromise()
      .catch(e => {
      console.log(e)
    });
    // console.log(resource);
    // const name = resource.name[0];
    return {
      id: resource.id,
      name: resource.name[0].text,
      email: this.parseEmail(resource.telecom),
      gender: resource.gender || '',
      birthDate: resource.birthDate || '',
      code: this.parseCode(resource.extension)
    };
  }


  parseEmail(telecom) {
    if (!telecom) {
      return null;
    }
    const emailElem = telecom.find(x => x.system === 'email');
    if (!emailElem) {
      return null;
    }
    return emailElem.value;
  }

  parseCode(codes) {
    for (var i = 0; i < codes.length; i++) {
      const filed = codes[i].valueCodeableConcept.coding[0].code;
      if (filed && filed != 'UNK') {
        return filed;
      }
    }
    return '';
  }

}


export interface Patient {
  id: string
  name: string
  email: string
  gender: string
  birthDate: string
  code: string
  datasource: string
}
