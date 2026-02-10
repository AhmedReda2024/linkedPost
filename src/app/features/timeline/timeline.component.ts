import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../../shared/components/create-post/create-post.component';
import { SinglePostComponent } from '../../shared/components/single-post/single-post.component';
import { PostService } from '../../shared/components/single-post/services/post/post.service';
import { PostData } from '../../shared/components/single-post/models/post-data.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-timeline',
  imports: [CreatePostComponent, SinglePostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  private readonly postService = inject(PostService);

  postsList: WritableSignal<PostData[]> = signal<PostData[]>([]);

  ngOnInit(): void {
    this.getAllPostsData();
  }

  getAllPostsData(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList.set(res.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
