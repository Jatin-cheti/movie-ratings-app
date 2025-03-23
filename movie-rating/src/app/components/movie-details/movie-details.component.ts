import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  isReviewModalOpen = false;
  reviews: any[] = [];
  reviewContent = '';
  reviewRating = 5;
  loggedInUserId: number | null = null; 
  editMode: number | null = null; 
  movieId: number | null = null;
  editedReviewContent = '';
  editedReviewRating = 5;
  currentPage = 1;
  totalPages = 1;
  limit = 5;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private router: Router,
    private authService: AuthService, 
    private toastr: ToastrService

  ) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.fetchMovieDetails(this.movieId, this.currentPage);
    }
    this.loggedInUserId = this.authService.getUserId();
  }


  fetchMovieDetails(movieId: number, page: number) {
    this.movieService.getMovieById(movieId, page).subscribe({
      next: (data) => {
        this.movie = data.movie;
        this.reviews = data.movie.reviews.map((review: { likesCount: any }) => ({
          ...review,
          likesCount: review.likesCount
        }));
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.toastr.success('Movie details loaded!', 'Success'); 
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.toastr.error('Failed to load movie details.', 'Error');
      }
    });
  }
  

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovieDetails(this.movieId!, this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovieDetails(this.movieId!, this.currentPage);
    }
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

  goBack() {
    this.router.navigate(['/movies']);
  }

  openReviewModal() {
    this.isReviewModalOpen = true;
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
  }

  addReview() {
    if (!this.reviewContent.trim()) {
      this.toastr.warning('Review content cannot be empty.', 'Warning'); 
      return;
    }

    this.reviewService.addReview(this.movie.id, this.reviewContent, this.reviewRating).subscribe({
      next: () => {
        this.toastr.success('Review added successfully!', 'Success');
        this.closeReviewModal();
        this.reviewContent = '';
        this.reviewRating = 5;
        if (this.movieId) {
          this.fetchMovieDetails(this.movieId, this.currentPage);
        }
      },
      error: (err) => {
        console.error('Error adding review:', err);
        this.toastr.error('Failed to add review.', 'Error'); 
      }
    });
  }
  likeReview(reviewId: number) {
    this.reviewService.likeReview(reviewId).subscribe({
      next: (response) => {
        this.toastr.success('Like successful!', 'Success');
        const review = this.movie.reviews.find((r: any) => r.id === reviewId);
        if (review) {
          review.likes = response.message === 'Review liked' ? review.likes + 1 : review.likes - 1;
        }
        if (this.movieId !== null) {
          this.fetchMovieDetails(this.movieId, this.currentPage);
        }
      },
      error: (err) => {
        console.error("Error liking review:", err);
        this.toastr.error("Error liking review:", err);
      }
    });
  }

  startEditReview(review: any) {
    this.editMode = review.id;
    this.editedReviewContent = review.content;
    this.editedReviewRating = review.rating;
  }

  cancelEdit() {
    this.editMode = null;
  }

  saveEditReview(reviewId: number) {
    this.reviewService.editReview(reviewId, this.editedReviewContent, this.editedReviewRating).subscribe({
      next: () => {
        this.toastr.success('Review updated successfully!', 'Success');
        this.editMode = null;
        this.fetchMovieDetails(this.movieId!, this.currentPage);
      },
      error: (err) => {
        console.error('Error editing review:', err);
        this.toastr.error('Failed to update review.', 'Error'); 
      }
    });
  }

  deleteReview(reviewId: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          this.toastr.success('Review deleted successfully!', 'Success');
          this.fetchMovieDetails(this.movieId!, this.currentPage);
        },
        error: (err) => {
          console.error('Error deleting review:', err);
          this.toastr.error('Failed to delete review.', 'Error');
        }
      });
    }
  }

  sortReviews(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    if (sortValue === 'recent') {
      this.reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortValue === 'popular') {
      this.reviews.sort((a, b) => b.likesCount - a.likesCount);
    }
  }
}
