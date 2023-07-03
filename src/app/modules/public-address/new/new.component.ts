import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddressDTO } from 'src/app/models';
import { FormsModule } from '@angular/forms';
import { PublicAddressService } from 'src/app/services/public-address/public-address.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  addressDTO: AddressDTO = {
    name: '',
    address: '',
    longitude: null,
    latitude: null,
  }

  addressId!: number;

  constructor(
    private _publicAddressService: PublicAddressService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.checkAddressId()
  }

  checkAddressId(): void {
    const { id } = this._route.snapshot.params

    if (id) {
      this.addressId = +id
      this.getAddressInfo()
    }
  }

  addNewAddress(): void {
    this._publicAddressService.add(this.addressDTO).subscribe(res => this.goToListPage())
  }

  editAddress(): void {
    this._publicAddressService.edit(this.addressId, this.addressDTO).subscribe(res => this.goToListPage())
  }

  getAddressInfo(): void {
    this._publicAddressService.show(this.addressId).subscribe(res => this.addressDTO = res)
  }

  goToListPage(): void {
    this._router.navigate(['/public-address/list'])
  }

  submitHandler(): void {
    this.addressId ? this.editAddress() : this.addNewAddress()
  }

}
