import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  signUp(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.base_url + 'users/signup', data);
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post<any>(environment.base_url + 'users/signin', data);
  }

  changePassword(data: object): Observable<any> {
    return this.httpClient.patch(environment.base_url + 'users/change-password', data);
  }

  uploadProfilePhoto(data: object): Observable<any> {
    return this.httpClient.put(environment.base_url + 'users/upload-photo', data);
  }

  getLoggedUserData(): Observable<any> {
    return this.httpClient.get(environment.base_url + 'users/profile-data');
  }
}
