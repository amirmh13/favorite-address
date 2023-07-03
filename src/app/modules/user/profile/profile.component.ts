import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SwalService } from 'src/app/services/swal/swal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userInfo!: User;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _swalService: SwalService,
  ) { }

  ngOnInit(): void {
    this._authService.userInfoObservable.subscribe(user => this.userInfo = { ...user })
  }

  updateUserInfo(profileForm: NgForm): void {
    if (!profileForm.valid) return

    this._userService.editUser(this.userInfo.id, this.userInfo).pipe(
      tap(user => this._authService.userInfo$.next(user))
    ).subscribe(user => {
      this._swalService.success()
    })
  }

}
