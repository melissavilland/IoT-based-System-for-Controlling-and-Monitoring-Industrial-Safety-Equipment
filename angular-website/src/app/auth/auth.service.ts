import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

const API_KEY = 'AIzaSyBeQQ1APWJgTaVHsyffVjAWQmJvgXlSL68';
// const CODE = '123456';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  email: string = null;
  private tokenExpirationTimer: any;
  role: string = null;

  constructor(private http: HttpClient, private router: Router)  {}



  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }
  ).pipe(catchError(this.handleError), tap(resData => {
    this.email = resData.email;
    this.handleAuthentication(
      resData.email,
      resData.localId,
      resData.idToken,
      +resData.expiresIn
    )
    if(resData.email == 'test@test.com' || resData.email == 'admin@admin.com') {
      this.role = 'admin';
    }
    else {
      this.role = 'user';
    }
  }));

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.email = resData.email;
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )
      if(resData.email == 'test@test.com' || resData.email == 'admin@admin.com') {
        this.role = 'admin';
      }
      else {
        this.role = 'user';
      }
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    this.email = loadedUser.email;
    console.log("loaded user ", this.email);

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration );
    }
    if(loadedUser.email == 'test@test.com' || loadedUser.email == 'admin@admin.com') {
      this.role = 'admin';
    }
    else {
      this.role = 'user';
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    this.email = null;
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    // this.email = null;

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.email = user.email;
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    if(user.email == 'test@test.com' || user.email == 'admin@admin.com') {
      this.role = 'admin';
    }
    else {
      this.role = 'user';
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email exists already!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email or password incorrect!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Email or password incorrect!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled by an administrator!';
        break;
    }
    return throwError(errorMessage);
  }
}

