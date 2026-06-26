import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Header, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  username = '';
  password = '';
  repeatPassword = '';

}