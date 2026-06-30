import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

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
    private postService: PostService
  ) { }

  onPhotoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];
      this.selectedPhoto = this.selectedFile.name;

    }
  }

  register(): void {

    const sendRegister = (photoPath: string) => {

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

          alert('Регистрация успешна!');

        },
        error: (err) => {

          console.log(err);
          alert(err.error);

        }

      });

    };

    // если фото есть — сначала грузим
    if (this.selectedFile) {

      this.authService.uploadAvatar(this.selectedFile).subscribe({

        next: (res: any) => {

          sendRegister(res.path);

        },
        error: (err) => {

          console.log(err);
          alert('Ошибка загрузки фото');

        }

      });

    }
    else {

      sendRegister('');

    }
  }
}