import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  @Input() message: string = '';

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
  ) { }

}
