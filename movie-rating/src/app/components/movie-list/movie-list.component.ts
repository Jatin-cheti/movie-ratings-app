import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  page: number = 1;
  hasMoreMovies: boolean = true; 
  loggedInUserId: number | null = null; 
  loggedInUserRole: string | null = null;

  constructor(private http: HttpClient, private router: Router, private movieService: MovieService, private authService: AuthService, 
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loggedInUserId = this.authService.getUserId();
    this.loggedInUserRole = this.authService.getUserRole();

    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getMovies(this.page).subscribe({
      next: (data) => {
        this.movies = data;
        this.hasMoreMovies = data.length === 6; 
        this.toastr.success('Movies loaded successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.toastr.error('Failed to load movies. Please try again.', 'Error');
      },
    });
  }

  nextPage() {
    if (this.hasMoreMovies) {
      this.page++;
      this.fetchMovies();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchMovies();
    }
  }


  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId]); 
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'assets/default-movie.jpg'; 
    }
    
    if (imageUrl.startsWith('http')) {
      return imageUrl; 
    }
    
    return `http://localhost:8000${imageUrl}`; 
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }
}
