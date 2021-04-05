import { Injectable } from '@angular/core';
import {Observation} from "./observation.service";
import {HttpClient} from "@angular/common/http";
import {RangeAbbre} from "../_dummyData/range-abbre";

@Injectable({
  providedIn: 'root'
})
export class SparklinesService {
  array = [];

  constructor(private http: HttpClient,
              private abb: RangeAbbre) { }


  async getLabTestDetails(id: string): Promise<SparklineDetails[]> {
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
      return;
    }

    entry.map((data) => {
      const resource = data.resource;
      if (!resource.valueQuantity) return;
      if (!resource.valueQuantity.value) return;
      if (!resource.effectiveDateTime) return;

      if (!resource.code || !resource.code.coding[0].display) return

      this.array.push( {
        labTestName: resource.code.coding[0].display,
        testDate: new Date(resource.effectiveDateTime),
        value: resource.valueQuantity.value
      });
    });

    return this.getArray();
  }

  getArray() {

    let map = new Map();
    let res: SparklineDetails[] = [];

    for (let data of this.array) {
      if (!map.has(this.abb[data.labTestName])) {
        map.set(this.abb[data.labTestName], [{testDate: data.testDate,
          value: data.value}])
      }
      else {
        map.get(this.abb[data.labTestName]).push({testDate: data.testDate,
          value: data.value});
      }
    }

    map.forEach((k,v) => {
      let newArr = k.sort((o1, o2) => (o1.testDate - o2.testDate)).map(x => x.value);
      let temp = new SparklineDetails();
      temp.name = v
      temp.value = newArr
      res.push(temp);
    });

    return res;
  }
}

export class SparklineDetails {
  name: string
  value: any[]
}
