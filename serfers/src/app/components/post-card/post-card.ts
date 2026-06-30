import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Post } from '../../models/post';

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

  likes = 0;

  ngOnInit(): void {

    this.likes = this.post.likesCount;

  }

  toggleComments(): void {

    this.showComments = !this.showComments;

  }

  toggleLike(): void {

    if (this.liked) {

      this.likes--;

    }
    else {

      this.likes++;

    }

    this.liked = !this.liked;

  }

}