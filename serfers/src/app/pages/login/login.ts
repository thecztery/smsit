import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../components/header/header';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Header, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {

    const dto = {

      login: this.email || this.username,

      password: this.password

    };

    this.authService.login(dto).subscribe({

      next: (response: any) => {

        localStorage.setItem('token', response.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        alert('Авторизация успешна!');

        this.router.navigate(['/']);

      },

      error: (err) => {

        alert(err.error);

      }

    });

  }

}