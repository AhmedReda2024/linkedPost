import { Component, input, InputSignal } from '@angular/core';
import { Comment } from '../single-post/models/post-data.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-comment',
  imports: [DatePipe],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css',
})
export class SingleCommentComponent {
  commentData: InputSignal<Comment> = input<Comment>({} as Comment);
}
