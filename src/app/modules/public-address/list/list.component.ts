import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicAddressService } from 'src/app/services/public-address/public-address.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Address } from 'src/app/models';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/components/dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatIconModule, MatDialogModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  publicAddresses: Address[] = [];

  constructor(
    private _publicAddressService: PublicAddressService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPublicAddresses()
  }

  openDeleteAddressDialog(address: Address): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '800',
      data: {
        title: `Delete ${address.name}`,
        text: 'Are you sure to delete this item?',
        item: address
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPublicAddresses()
    });
  }

  getAllPublicAddresses() {
    this._publicAddressService.getAll().subscribe(res => this.publicAddresses = res)
  }
}
