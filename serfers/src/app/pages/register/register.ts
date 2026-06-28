import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';

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

  selectedPhoto = '';

  contacts = '';
  about = '';
  achievements = '';

  onPhotoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedPhoto = input.files[0].name;

    }

  }

}