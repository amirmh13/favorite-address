import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, AddressDTO } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PublicAddressService {

  private publicAddressBaseURL: string = '/public-addresses'

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Address[]> {
    return this._http.get<Address[]>(this.publicAddressBaseURL)
  }

  delete(id: number): Observable<unknown> {
    return this._http.delete<unknown>(this.publicAddressBaseURL + '/' + id)
  }

  add(data: AddressDTO): Observable<AddressDTO> {
    return this._http.post<AddressDTO>(this.publicAddressBaseURL, data)
  }

  edit(id: number, data: AddressDTO): Observable<AddressDTO> {
    return this._http.put<AddressDTO>(this.publicAddressBaseURL + '/' + id, data)
  }

  show(id: number): Observable<AddressDTO> {
    return this._http.get<AddressDTO>(this.publicAddressBaseURL + '/' + id)
  }
}
