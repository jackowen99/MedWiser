import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Template} from "../components/quest-nav/quest-nav.component";


@Injectable({
  providedIn: 'root'
})

export class TemplateService {

  constructor(private http: HttpClient) { }

  async getTemplateByName(name: string) {
    return await this.http.get(environment.API_ROOT + `/templates/${name}`).toPromise().catch(e => {
      console.log(e)
    });
  }

  async saveTemplate(username:string, templateName: string, isPublic: boolean, templateDetail: string[]) {
    return await this.http.post(environment.API_ROOT + `/templates/${username}`, {templateName, isPublic, templateDetail}).toPromise().catch(e => {
      console.log(e)
    });
  }

  async getAllTemplates(name: string): Promise<any> {
    return await this.http.get(environment.API_ROOT + `/templates/all/${name}`).toPromise().catch(e => {
      console.log(e)
    });
  }

  async updateTemplate(template: Template) {
    return await this.http.put(environment.API_ROOT + `/templates/${template.id}`, template).toPromise().catch(e => {
      console.log(e)
    });
  }

  async deleteTemplate(id: number) {
    return await this.http.delete(environment.API_ROOT + `/templates/${id}`).toPromise().catch(e => {
      console.log(e)
    });
  }

}
