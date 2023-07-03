import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Address, AddressDTO } from 'src/app/models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteAddressService {

  private favoriteAddressBaseURL: string = '/favorite-addresses'

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
  ) { }

  getAll(): Observable<Address[]> {
    return this._http.get<Address[]>(this.favoriteAddressBaseURL).pipe(
      map((address) => address.filter(address => address.userId === +this._authService.getUserClaim.sub))
    )
  }

  delete(id: number): Observable<unknown> {
    return this._http.delete<unknown>(this.favoriteAddressBaseURL + '/' + id)
  }

  add(data: AddressDTO): Observable<AddressDTO> {
    data.userId = +this._authService.getUserClaim.sub
    return this._http.post<AddressDTO>(this.favoriteAddressBaseURL, data)
  }

  edit(id: number, data: AddressDTO): Observable<AddressDTO> {
    data.userId = +this._authService.getUserClaim.sub
    return this._http.put<AddressDTO>(this.favoriteAddressBaseURL + '/' + id, data)
  }

  show(id: number): Observable<AddressDTO> {
    return this._http.get<AddressDTO>(this.favoriteAddressBaseURL + '/' + id)
  }
}
