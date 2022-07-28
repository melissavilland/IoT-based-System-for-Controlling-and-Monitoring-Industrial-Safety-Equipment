import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  email = this.authService.email;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      console.log("email: ", this.email);
      this.email = this.authService.email;
      this.isAuthenticated = !!user;
    });
  }

    onLogout() {
      this.authService.logout();
    }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
