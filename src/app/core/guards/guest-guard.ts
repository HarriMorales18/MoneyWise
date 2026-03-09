import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authService.isAuthenticatedAsync();
    return isAuthenticated ? this.router.parseUrl('/tabs/dashboard') : true;
  }
}
