import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { PostDataResponse } from '../../models/post-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  createPost(data: object): Observable<any> {
    return this.httpClient.post(environment.base_url + 'posts', data);
  }

  getAllPosts(): Observable<PostDataResponse> {
    return this.httpClient.get<PostDataResponse>(environment.base_url + 'posts?limit=50');
  }

  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(environment.base_url + `users/${userId}/posts?limit=2`);
  }

  getSinglePost(postId: string | null): Observable<any> {
    return this.httpClient.get(environment.base_url + `posts/${postId}`);
  }
}
