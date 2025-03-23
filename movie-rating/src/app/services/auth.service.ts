import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getUserId(): number | null {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.id || null;
  }
  
  getUsername(): string | null {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.username || null;
  }
  
  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.role || null;
  }
  private apiUrl = 'http://127.0.0.1:8000/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response) => {
          if (response.token && response.user) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
          }
          observer.next(response);
        },
        error: (err) => observer.error(err),
      });
    });
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
