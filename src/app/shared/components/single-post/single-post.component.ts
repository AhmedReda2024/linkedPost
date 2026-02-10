import {
  Component,
  inject,
  input,
  Input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Comment, PostData } from './models/post-data.interface';
import { DatePipe } from '@angular/common';
import { SingleCommentComponent } from '../single-comment/single-comment.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../single-comment/services/comment/comment.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, SingleCommentComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  private readonly commentService = inject(CommentService);

  postData: InputSignal<PostData> = input<PostData>({} as PostData);

  commentControl: FormControl = new FormControl(null, [Validators.required]);

  commentsPost: WritableSignal<Comment[]> = signal<Comment[]>([]);

  ngOnInit(): void {
    this.commentsPost.set(this.postData().comments);
  }

  onSubmitForm(e: SubmitEvent): void {
    e.preventDefault();
    if (this.commentControl.valid) {
      const data = {
        content: this.commentControl.value,
        post: this.postData().id,
      };

      this.commentService.createComment(data).subscribe({
        next: (res) => {
          this.commentsPost.set(res.comments);
          this.commentControl.reset();
        },
      });
    }
  }
}
