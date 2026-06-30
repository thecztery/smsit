import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post } from '../models/post';

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

}