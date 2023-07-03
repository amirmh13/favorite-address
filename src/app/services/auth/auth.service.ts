import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable, mergeMap, tap } from 'rxjs';
import { AuthResponse, LoginDTO, RegisterDTO, User, UserClaim } from 'src/app/models';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** 
    *Salt keys for Access Tokens
    */
  private tokenNameSalt: string = 'gfpijkd5@*$%&#GH'

  INITIAL_USER_INFO: User = { email: '', id: 0, name: '', password: '', phoneNumber: '' }

  userInfo$: BehaviorSubject<User> = new BehaviorSubject<User>(this.INITIAL_USER_INFO);
  userInfoObservable = this.userInfo$.asObservable()

  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedInObservable = this.isUserLoggedIn$.asObservable()


  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _userService: UserService,
  ) { }

  /**
     * Get Access Token
     * @returns Access Token String
     */

  get getToken(): string {
    return localStorage.getItem(this.tokenNameSalt) || '';
  }

  /**
   * Set Access Token
   */

  set setToken(token: string) {
    localStorage.setItem(this.tokenNameSalt, token);
  }

  /**
   * Get User Claim
   * @returns Interface of UserClaim Object
   */

  get getUserClaim(): UserClaim {
    return jwt_decode(this.getToken);
  }

  /**
   * Is user logged in?
   * @returns boolean
   */

  get isLoggedIn(): boolean {
    return !!this.getToken && !this.TokenIsExpired();
  }

  /**
   * Check token is valid or not?
   * @returns Boolean
   */

  TokenIsExpired(): boolean {
    const expDate = this.getUserClaim.exp * 1000; //To milliseconds

    return expDate < Date.now();
  }



  /**
  * Logout and remove access and refresh tokens from local storage
  */

  logout(): void {
    localStorage.removeItem(this.tokenNameSalt);

    this.userInfo$.next(this.INITIAL_USER_INFO)
    this.isUserLoggedIn$.next(false)

    this._router.navigateByUrl('/')
  }

  /**
   * Register API call
   * @param data RegisterDTO
   * @returns Observable<AuthResponse>
   */

  register(data: RegisterDTO): Observable<AuthResponse> {
    return this._http.post<AuthResponse>('/register', data).pipe(
      tap((res) => this.setToken = res.accessToken),
      tap(() => {
        const userClaim = this.getUserClaim

        this.getUser(+userClaim.sub).subscribe()
      }),
      tap(() => this._router.navigateByUrl('/'))
    )
  }

  /**
   * Login API call
   * @param data LoginDTO
   * @returns Observable<AuthResponse>
   */

  login(data: LoginDTO): Observable<AuthResponse> {
    return this._http.post<AuthResponse>('/login', data).pipe(
      tap((res) => this.setToken = res.accessToken),
      tap(() => {
        const userClaim = this.getUserClaim

        this.getUser(+userClaim.sub).subscribe()
      }),
      tap(() => this._router.navigateByUrl('/'))
    )
  }

  getUser(id: number) {
    return this._userService.getUser(id).pipe(
      tap((user) => this.userInfo$.next(user)),
      tap((user) => this.isUserLoggedIn$.next(true)),
    );
  }

}
