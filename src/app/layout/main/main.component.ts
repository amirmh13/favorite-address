import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userInfo!: User
  isUserLoggedIn: boolean = false;

  constructor(
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._authService.userInfoObservable.subscribe(user => this.userInfo = user)
    this._authService.isUserLoggedInObservable.subscribe(data => this.isUserLoggedIn = data)
  }

  logout(): void {
    this._authService.logout()
  }

}
