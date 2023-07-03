import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogData, Address } from 'src/app/models';
import { MatButtonModule } from '@angular/material/button';
import { PublicAddressService } from 'src/app/services/public-address/public-address.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private _publicAddressService: PublicAddressService,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData<Address>,
  ) { }

  deletePublicAddress():void{
    this._publicAddressService.delete(this.data.item.id).subscribe(() => this.closeDialog())
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
