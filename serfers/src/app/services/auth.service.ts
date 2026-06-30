import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:5001/api/auth';

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  uploadAvatar(file: File) {

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(
    'http://localhost:5001/api/image/upload/avatars',
    formData
  );

}

}