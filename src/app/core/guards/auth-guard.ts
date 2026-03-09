import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    return this.validateSession();
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    return this.validateSession();
  }

  private async validateSession(): Promise<boolean | UrlTree> {

    if (await this.authService.isAuthenticatedAsync()) {
      return true;
    } else {
      return this.router.parseUrl('/auth/login');
    }

  }

}