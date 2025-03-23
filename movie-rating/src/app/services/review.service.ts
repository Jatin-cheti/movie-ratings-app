import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/reviews';

  constructor(private http: HttpClient) {}

  addReview(movieId: number, content: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${movieId}`, { content, rating });
  }

  likeReview(reviewId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${reviewId}/like`, {});
  }

  editReview(reviewId: number, content: string, rating: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}`, { content, rating });
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }
}
