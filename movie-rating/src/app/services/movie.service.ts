import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/movies';
  private adminUrl = 'http://127.0.0.1:8000/api/v1/admin';


  constructor(private http: HttpClient, private router: Router) {}

  getmovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  getMovies(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-movies?page=${page}`);
  }
  getMovieById(movieId: number, page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movieById?id=${movieId}&page=${page}&limit=${limit}`);
  }
  
  // getMovies() {
  //   return this.http.get<any[]>('http://localhost:8000/api/movies');
  // }
  
  addMovie(movieData: FormData): Observable<any> {
    return this.http.post(`${this.adminUrl}/add-movie`, movieData);
  }

  editMovie(id: number, movieData: FormData): Observable<any> {
    return this.http.put(`${this.adminUrl}/edit-movie/${id}`, movieData);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/delete-movie/${id}`);
  }
 
}
