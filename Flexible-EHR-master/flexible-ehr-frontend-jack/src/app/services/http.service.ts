import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(
    private http:HttpClient
  ) {
    
  }
  get<T>(url:string):Promise<T> {
    return this.http.get<T>(`${environment.API_ROOT}/${url}`).toPromise()
  }
  patch<T>(url,body:any): Promise<T> {
    return this.http.patch<T>(`${environment.API_ROOT}/${url}`,body).toPromise()
  }

  
}

