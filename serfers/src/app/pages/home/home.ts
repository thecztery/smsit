import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { PostCard } from '../../components/post-card/post-card';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  posts = [

    {
      id: 1,
      author: 'Иван Иванов',
      avatar: '',
      date: '27 июня 2026',
      text: 'Это первый тестовый пост. Здесь позже будет текст из базы данных.',
      comments: [
  'Очень интересно',
  'Полностью согласен'
]
    },

    {
      id: 2,
      author: 'Анна Петрова',
      avatar: '',
      date: '26 июня 2026',
      text: 'Angular отлично подходит для создания подобных приложений.',
      comments: [
        'Полностью согласен.'
      ]
    }

  ];

}