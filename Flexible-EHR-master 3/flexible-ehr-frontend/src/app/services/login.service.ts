import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }


  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(environment.API_ROOT + '/users/login', {name, password})
      .pipe(map(user => {
        sessionStorage.setItem('username', (user.name));
        return user;
      }));
  }
}
