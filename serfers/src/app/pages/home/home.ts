import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Header } from '../../components/header/header';
import { PostCard } from '../../components/post-card/post-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    PostCard,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  newPost = '';

  selectedImage = '';

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedImage = input.files[0].name;

    }

  }

  posts = [

  {
    id: 1,

    author: 'Enotovod',

    avatar: 'images/avatar1.png',

    date: '13.06.2019 в 20:15',

    text: 'Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text Sample text.',

    image: 'images/post1.jpg',

    likes: 18655,

    comments: [

  {
    author: 'Surfer2010',
    avatar: 'images/avatar1.png',
    text: 'Прикольные фотки!'
  },

  {
    author: 'Nikolpix',
    avatar: 'images/avatar2.png',
    text: 'Очень красиво!'
  },

  {
    author: 'Enotovod',
    avatar: 'images/avatar1.png',
    text: 'Спасибо!'
  }

]
  },

  {
    id: 2,

    author: 'SimonsCat',

    avatar: 'images/avatar2.png',

    date: '13.06.2019 в 19:57',

    text: 'Sample text Sample text Sample text Sample text Sample text Sample text Sample text.',

    image: 'images/post2.jpg',

    likes: 18655,

    comments: []

  }

];
addPost(): void {

  const text = this.newPost.trim();

  if (!text) {
    return;
  }

  this.posts.unshift({

    id: this.posts.length + 1,

    author: 'Вы',

    avatar: 'assets/images/avatar1.png',

    date: this.getCurrentDate(),

    text: text,

    image: this.selectedImage || 'assets/images/post1.jpg',

    likes: 0,

    comments: []

  });

  this.newPost = '';
  this.selectedImage = '';

}

getCurrentDate(): string {

  const now = new Date();

  const date = now.toLocaleDateString('ru-RU');

  const time = now.toLocaleTimeString('ru-RU', {

    hour: '2-digit',
    minute: '2-digit'

  });

  return `${date} в ${time}`;

}

}