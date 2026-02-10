import {
  Component,
  ElementRef,
  inject,
  Signal,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../single-post/services/post/post.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postService = inject(PostService);

  showModel: boolean = false;

  inputFile: WritableSignal<File | null> = signal<File | null>(null);

  contentControl: FormControl = new FormControl(null, [Validators.required]);

  toggleModel(): void {
    this.showModel = !this.showModel;
  }

  closeModel(): void {
    this.showModel = false;
  }

  changeFile(e: Event): void {
    const inputFile = e.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      this.inputFile.set(inputFile.files[0]); //File
    }
  }

  onSubmitForm(e: SubmitEvent): void {
    if (this.contentControl.valid) {
      e.preventDefault();
      console.log(this.contentControl.value); //Content

      const formData = new FormData();

      formData.append('body', this.contentControl.value);

      if (this.inputFile()) {
        formData.append('image', this.inputFile()!, this.inputFile()?.name);
      }

      // send form-data to backend
      this.postService.createPost(formData).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.contentControl.reset();
            this.closeModel();
            // getPosts
          }
        },
      });
    }
  }
}
