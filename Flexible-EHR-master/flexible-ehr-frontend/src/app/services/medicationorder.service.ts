import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobaldataService} from './globaldata.service';
import {resource} from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class MedicationorderService {

  constructor(
    private http: HttpClient,
    private globalData: GlobaldataService
  ) {
  }

  async searchByPatientId(id: string): Promise<MedicationOrder[]> {
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

  async searchinit(id: string, dataSource: string): Promise<MedicationOrder[]> {
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

  async searchByPatientId_school(id: string): Promise<MedicationOrder[]> {
    if (id == '' || id == null) {
      return [];
    }


    // const medication_statement_result = await this.http.get<any>(" http://http://130.49.206.139:8080/omoponfhir3/fhir/MedicationStatement?",{
    //   params:{
    //     patient:id
    //   }
    // }).toPromise()

    const medication_statement_result = await this.http.get<any>(`http://130.49.206.139:8080/omoponfhir3/fhir/MedicationStatement?`, {
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


    const medication_statement_entry = medication_statement_result.entry;

    // console.log(medication_statement_entry)

    if (!medication_statement_entry) {
      return [];
    }

    return medication_statement_entry.map((data) => {
      const resource = data.resource;

      return {
        MedicationOrder_id: resource.id || 'N/A',
        patient: resource.subject.reference,
        medicationReference: resource.medicationCodeableConcept.coding[0].display,
        //??
        dosageInstruction_name: resource.dosage ? resource.dosage[0].text : 'N/A',
        dosageInstruction_code: 'N/A',
        dosageInstruction_timing_period: 'N/A',
        dosageInstruction_timing_periodUnits: 'N/A',
        dosageInstruction_timing_boundsPeriod_start: resource.effectivePeriod.start,
        dosageInstruction_timing_boundsPeriod_end: resource.effectivePeriod.end,
        dosageInstruction_dosQuantity_value: resource.dosage ? (resource.dosage[0].doseQuantity ? resource.dosage[0].doseQuantity.value : 'N/A') : 'N/A',
        dosageInstruction_dosQuantity_unit: resource.dosage ? resource.dosage[0].text : 'N.A',
        identifier_system: resource.medicationCodeableConcept.coding[0].system || 'N/A',
        identifier_code: resource.medicationCodeableConcept.coding[0].code || 'N/A'
      };
    });

  }

  async searchByPatientId_hapi(id: string): Promise<MedicationOrder[]> {
    if (id == '' || id == null) {
      return [];
    }

    const medication_statement_result = await this.http.get<any>('http://hapi.fhir.org/baseR4/MedicationRequest', {
      params: {
        patient: id
      }
    }).toPromise().catch(e => {
      console.log(e)
    });


    const medication_statement_entry = medication_statement_result.entry;

    if (!medication_statement_entry) {
      return [];
    }

    return medication_statement_entry.map((data) => {
      const resource = data.resource;

      // console.log(resource)

      return {
        MedicationOrder_id: resource.id || 'N/A',
        patient: resource.subject.reference,
        medicationReference: resource.medicationCodeableConcept ? resource.medicationCodeableConcept.coding[0].display : 'N/A',
        status: resource.status ? resource.status : "N/A",
        //dosageInstruction_name: resource.medicationCodeableConcept ? resource.medicationCodeableConcept.coding[0].text : 'N/A',
        dosageInstruction_name: resource.dosageInstruction ? resource.dosageInstruction[0].text : 'N/A',
        dosageInstruction_code: resource.dosage ? resource.dosage[0].text : 'N/A',
        //dosageInstruction_timing_period: resource.effectiveDateTime || 'N/A',
        dosageInstruction_timing_period: resource.authoredOn || 'N/A',
        dosageInstruction_timing_periodUnits: 'N/A',
        dosageInstruction_timing_boundsPeriod_start: resource.lastUpdated,
        //dosageInstruction_timing_boundsPeriod_end: new Date(),
        dosageInstruction_timing_boundsPeriod_end: resource.authoredOn || 'N/A',
        //error
        // dosageInstruction_dosQuantity_value: resource.dosage ? resource.dosage[0].text : "N/A",
        dosageInstruction_dosQuantity_value: resource.dosageInstruction ? resource.dosageInstruction[0].doseAndRate[0].doseQuantity.value : 'N/A',
        dosageInstruction_dosQuantity_unit: 'N/A',
        // //error
        // identifier_system:resource.statusReason[0].coding[0].system || "N/A",
        // //error
        // identifier_code:resource.statusReason[0].coding[0].code || "N/A"
      };
    });

  }

  async searchByPatientId_open(id: string): Promise<MedicationOrder[]> {
    if (id == '' || id == null) {
      return [];
    }
    const result = await this.http.get<any>('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/MedicationOrder', {
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
      if (resource.resourceType == 'OperationOutcome') {
        return [];
      }
      let index = resource.medicationReference.display.indexOf(')') + 1;

      return {
        MedicationOrder_id: resource.id,
        patient: resource.patient.display,
        medicationReference: resource.medicationReference.display.substring(0, index),
        dosageInstruction_name: resource.dosageInstruction[0].text,
        dosageInstruction_code: resource.dosageInstruction[0].route.coding[0].code,
        dosageInstruction_timing_period: resource.dosageInstruction[0].timing.repeat.period,
        dosageInstruction_timing_periodUnits: resource.dosageInstruction[0].timing.repeat.periodUnits,
        dosageInstruction_timing_boundsPeriod_start: resource.dosageInstruction[0].timing.repeat.boundsPeriod.start,
        dosageInstruction_timing_boundsPeriod_end: resource.dosageInstruction[0].timing.repeat.boundsPeriod.end,
        dosageInstruction_dosQuantity_value: resource.dosageInstruction[0].doseQuantity.value,
        dosageInstruction_dosQuantity_unit: resource.dosageInstruction[0].doseQuantity.unit,
        identifier_system: resource.identifier[0].system,
        identifier_code: resource.identifier[0].value
      };
    });
  }

}

export interface MedicationOrder {
  MedicationOrder_id: string,
  patient: string,
  medicationReference: string,
  status: string,
  dosageInstruction_name: string,
  dosageInstruction_code: string,
  dosageInstruction_timing_period: number,
  dosageInstruction_timing_periodUnits: string,
  dosageInstruction_timing_boundsPeriod_start: string,
  dosageInstruction_timing_boundsPeriod_end: string,
  dosageInstruction_dosQuantity_value: number,
  dosageInstruction_dosQuantity_unit: string,
  identifier_system: string,
  identifier_code: string,
  isSelected: boolean
}

