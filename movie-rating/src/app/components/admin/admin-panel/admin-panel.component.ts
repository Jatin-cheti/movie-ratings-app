import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { ReviewService } from '../../../services/review.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [CommonModule, FormsModule,ToastrModule ] 
})
export class AdminPanelComponent implements OnInit {
  movies: any[] = [];
  page: number = 1;
  hasMoreMovies: boolean = true;
  showModal: boolean = false;
  editingMovie: boolean = false;
  selectedFile: File | null = null;

  movieForm = {
    id: null as number | null,
    title: '',
    description: '',
    rating: '',
    imageUrl: ''
  };

  constructor(private movieService: MovieService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getMovies(this.page).subscribe({
      next: (data) => {
        this.movies = data;
        this.hasMoreMovies = data.length === 6; 
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.toastr.error('Failed to fetch movies.', 'Error');
      }
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

  deleteMovie(movieId: number) {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movieId).subscribe({
        next: () => {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
          this.toastr.success('Movie deleted successfully.', 'Success');
        },
        error: (err) => {
          console.error('Error deleting movie:', err);
          this.toastr.error('Failed to delete movie.', 'Error');
        }
      });
    }
  }

  openAddMovieModal() {
    this.editingMovie = false;
    this.showModal = true;
    this.movieForm = { id: null, title: '', description: '', rating: '', imageUrl: '' };
  }

  openEditMovieModal(movie: any) {
    this.editingMovie = true;
    this.showModal = true;
    this.movieForm = { ...movie };
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitMovieForm() {
    const formData = new FormData();

    if (this.movieForm.title.trim()) {
      formData.append('title', this.movieForm.title.trim());
    } else {
      this.toastr.warning('Title is required.', 'Warning');
      return;
    }

    if (this.movieForm.description.trim()) {
      formData.append('description', this.movieForm.description.trim());
    } else {
      this.toastr.warning('Description is required.', 'Warning');
      return;
    }

    if (this.movieForm.rating) {
      formData.append('rating', String(this.movieForm.rating));
    } else {
      this.toastr.warning('Rating is required.', 'Warning');
      return;
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editingMovie && this.movieForm.id !== null) {
      this.movieService.editMovie(this.movieForm.id, formData).subscribe({
        next: () => {
          this.fetchMovies();
          this.closeModal();
          this.toastr.success('Movie updated successfully.', 'Success');
        },
        error: (err) => {
          console.error('Error updating movie:', err);
          this.toastr.error('Failed to update movie.', 'Error');
        }
      });
    } else {
      this.movieService.addMovie(formData).subscribe({
        next: () => {
          this.fetchMovies();
          this.closeModal();
          this.toastr.success('Movie added successfully.', 'Success');
        },
        error: (err) => {
          console.error('Error adding movie:', err);
          this.toastr.error('Failed to add movie.', 'Error');
        }
      });
    }
  }
  

  getImageUrl(imageUrl: string): string {
    return imageUrl ? `http://localhost:8000${imageUrl}` : 'assets/default-movie.jpg';
  }
}
