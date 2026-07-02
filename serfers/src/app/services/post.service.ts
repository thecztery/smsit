import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api = 'http://localhost:5001/api/posts';

  private imageApi = 'http://localhost:5001/api/image';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {

    return this.http.get<Post[]>(this.api);

  }

  createPost(post: any) {

    return this.http.post(this.api, post);

  }

  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.imageApi}/upload/posts`,
      formData
    );

  }

  toggleLike(postId: number) {

    return this.http.post(
      `http://localhost:5001/api/like/${postId}`,
      {}
    );

  }

  getComments(postId: number): Observable<Comment[]> {

    return this.http.get<Comment[]>(
      `${this.api}/${postId}/comments`
    );

  }

  createComment(postId: number, text: string) {

    return this.http.post(
      `${this.api}/${postId}/comments`,
      {
        text
      }
    );

  }

  deleteComment(postId: number, commentId: number) {

    return this.http.delete(
      `${this.api}/${postId}/comments/${commentId}`
    );

  }

}