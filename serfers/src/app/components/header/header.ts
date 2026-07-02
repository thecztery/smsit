import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.authService.user$.subscribe(user => {

      this.user = user;

    });

  }

  logout(): void {

    localStorage.removeItem('token');

    this.authService.setUser(null);

    this.router.navigate(['/login']);

  }

}