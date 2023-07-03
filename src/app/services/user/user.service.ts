import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, UserInfoDTO } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBaseURL: string = '/users'

  constructor(
    private _http: HttpClient,
  ) { }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(this.userBaseURL + '/' + id)
  }

  editUser(id: number, { email, name, phoneNumber }: UserInfoDTO): Observable<User> {
    const postBody: Omit<UserInfoDTO, "password"> = { email, name, phoneNumber }

    return this._http.patch<User>(this.userBaseURL + '/' + id, postBody)
  }
}
