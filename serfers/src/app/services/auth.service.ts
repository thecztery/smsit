import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:5001/api/auth';

  user$ = new BehaviorSubject<any>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  );

  constructor(private http: HttpClient) { }

  register(data: any) {

    return this.http.post<any>(`${this.api}/register`, data);

  }

  login(data: any) {

    return this.http.post<any>(`${this.api}/login`, data);

  }

  uploadAvatar(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(
      'http://localhost:5001/api/image/upload/avatars',
      formData
    );

  }

  setUser(user: any): void {

    if (user) {

      localStorage.setItem('user', JSON.stringify(user));

    }
    else {

      localStorage.removeItem('user');

    }

    this.user$.next(user);

  }

}