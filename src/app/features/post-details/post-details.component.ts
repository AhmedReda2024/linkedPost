import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/components/single-post/services/post/post.service';
import { PostData } from '../../shared/components/single-post/models/post-data.interface';
import { SinglePostComponent } from '../../shared/components/single-post/single-post.component';

@Component({
  selector: 'app-post-details',
  imports: [SinglePostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);

  postId: WritableSignal<string | null> = signal<string | null>(null);

  post: WritableSignal<PostData> = signal<PostData>({} as PostData);

  ngOnInit(): void {
    this.getPostIdFromUrl();

    this.getPostDetails();
  }

  getPostIdFromUrl(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.postId.set(urlParams.get('id'));
      },
    });
  }

  getPostDetails(): void {
    this.postService.getSinglePost(this.postId()).subscribe({
      next: (res) => {
        this.post.set(res.post);
      },
    });
  }
}
