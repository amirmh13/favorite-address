import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterDTO } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerPostBody: RegisterDTO = {
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  }

  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  get getSubmitBtnText(): string {
    return this.isLoading ? 'Please waite' : 'Register';
  }

  onFormSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.isLoading = true;

      this._authService.register(this.registerPostBody).pipe(
        catchError(() => {
          this.isLoading = false;
          return EMPTY
        }),
      ).subscribe(res => {
        registerForm.resetForm();
        this.isLoading = false;
      })
    }
  }

}
