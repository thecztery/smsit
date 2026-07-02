import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Header, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  nickname = '';
  email = '';
  password = '';
  repeatPassword = '';

  firstName = '';
  lastName = '';

  contacts = '';
  about = '';
  achievements = '';

  selectedFile: File | null = null;
  selectedPhoto = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onPhotoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];
      this.selectedPhoto = this.selectedFile.name;

    }

  }

  register(): void {

    const registerUser = (photoPath: string) => {

      const dto = {

        nickname: this.nickname,
        email: this.email,
        password: this.password,

        firstName: this.firstName,
        lastName: this.lastName,

        photo: photoPath,

        contacts: this.contacts,
        about: this.about,
        achievements: this.achievements

      };

      this.authService.register(dto).subscribe({

        next: () => {

          this.authService.login({

            login: this.nickname,

            password: this.password

          }).subscribe({

            next: (response: any) => {

              localStorage.setItem('token', response.token);

              this.authService.setUser(response.user);

              this.router.navigate(['/']);

            },

            error: (err) => {

              console.log(err);

            }

          });

        },

        error: (err) => {

          console.log(err);
          alert(err.error);

        }

      });

    };

    if (this.selectedFile) {

      this.authService.uploadAvatar(this.selectedFile).subscribe({

        next: (response: any) => {

          registerUser(response.path);

        },

        error: (err) => {

          console.log(err);

        }

      });

    }
    else {

      registerUser('');

    }

  }

}