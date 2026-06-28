import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
  
})
export class PostCard implements OnInit {

  ngOnInit(): void {

    this.likes = this.post.likes;

}

  @Input({ required: true })
  post: any;

  showComments = false;

  visibleComments = 2;

  liked = false;
likes = 0;

toggleComments(): void {

  this.showComments = !this.showComments;

}

toggleLike(): void {

  if (this.liked) {

    this.likes--;

  } else {

    this.likes++;

  }

  this.liked = !this.liked;
}

newComment = '';

addComment(): void {

  const text = this.newComment.trim();

  if (!text) {
    return;
  }

  this.post.comments.unshift({

    author: 'Вы',

    avatar: 'assets/images/avatar1.png',

    text: text

  });

  this.newComment = '';

}
}
