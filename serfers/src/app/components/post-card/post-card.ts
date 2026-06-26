import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {

  @Input({ required: true })
  post: any;

}