import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);

  createComment(data: object): Observable<any> {
    return this.httpClient.post(environment.base_url + 'comments', data);
  }

  getPostComments(postId: string): Observable<any> {
    return this.httpClient.get(environment.base_url + `posts/${postId}/comments`);
  }
}
