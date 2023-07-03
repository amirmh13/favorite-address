import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { LoginDTO } from 'src/app/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginPostBody: LoginDTO = {
    email: '',
    password: '',
  }

  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  get getSubmitBtnText(): string {
    return this.isLoading ? 'Please waite' : 'Login';
  }

  onFormSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.isLoading = true;

      this._authService.login(this.loginPostBody).pipe(
        catchError(() => {
          this.isLoading = false;
          return EMPTY
        }),
      ).subscribe(res => {
        loginForm.resetForm();
        this.isLoading = false;
      })
    }
  }

}
