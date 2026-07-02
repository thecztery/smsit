import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Header } from '../../components/header/header';
import { PostCard } from '../../components/post-card/post-card';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    PostCard,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  newPost = '';

  selectedImage = '';

  selectedFile: File | null = null;

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadPosts();

  }

  loadPosts(): void {

    this.postService.getPosts().subscribe({

      next: (posts) => {

    console.log(posts);

    this.posts = posts;

    this.cdr.detectChanges();

},

      error: (err) => console.log(err)

    });

  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];

      this.selectedImage = this.selectedFile.name;

    }

  }

  addPost(): void {

  const text = this.newPost.trim();

  if (!text && !this.selectedFile) {

    return;

  }

  if (this.selectedFile) {

    this.postService.uploadImage(this.selectedFile).subscribe({

      next: (response: any) => {

        this.createPost(response.path);

      },

      error: (err) => console.log(err)

    });

  }
  else {

    this.createPost('');

  }

}

  createPost(imagePath: string): void {

  this.postService.createPost({

    text: this.newPost.trim(),

    image: imagePath

  }).subscribe({

    next: () => {

      this.newPost = '';

      this.selectedImage = '';

      this.selectedFile = null;

      this.loadPosts();

    },

    error: (err) => console.log(err)

  });

}

}