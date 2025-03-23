import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.role === 'admin') {
          return true; // Allow access if user is admin
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    this.router.navigate(['/']); // Redirect if not admin
    return false;
  }
}
