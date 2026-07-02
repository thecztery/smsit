import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {

  @Input({ required: true })
  post!: Post;

  showComments = false;

  liked = false;

  comments: Comment[] = [];

newComment = '';

  constructor(private postService: PostService) { }

  toggleComments(): void {

  this.showComments = !this.showComments;

  if (this.showComments) {

    this.postService.getComments(this.post.id).subscribe({

      next: (comments) => {

        this.comments = comments;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}

  toggleLike(): void {

    this.postService.toggleLike(this.post.id).subscribe({

      next: (response: any) => {

        this.liked = response.liked;

        this.post.likesCount = response.likesCount;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addComment(): void {

  if (!this.newComment.trim()) {

    return;

  }

  this.postService.createComment(
    this.post.id,
    this.newComment
  ).subscribe({

    next: () => {

      this.newComment = '';

      this.post.commentsCount++;

      this.toggleComments();

      this.toggleComments();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}