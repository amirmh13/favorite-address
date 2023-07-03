import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  private _snackbarConfig: MatSnackBarConfig = {
    duration: 5 * 1000, // 5 Seconds
    direction: 'rtl',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  }

  private _defaultSuccessText: string = 'operation accomplished';

  private _successPanelClass: string[] = ['success-swal'];
  private _dangerPanelClass: string[] = ['error-swal'];

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  show(title: string): void {
    const ref = this._snackBar.openFromComponent(SnackbarComponent, this._snackbarConfig);

    ref.instance.message = title || 'An error occurred!';
  }

  error(title: string): void {
    this._snackbarConfig.panelClass = this._dangerPanelClass;
    this.show(title);
  }

  success(title: string = this._defaultSuccessText): void {
    this._snackbarConfig.panelClass = this._successPanelClass;
    this.show(title);
  }
}
