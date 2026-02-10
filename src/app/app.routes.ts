import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ChangePasswordComponent } from './core/auth/change-password/change-password.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'timeline',
        component: TimelineComponent,
        title: 'Timeline',
      },
      {
        path: 'userProfile',
        component: UserProfileComponent,
        title: 'Profile',
      },
      {
        path: 'postDetails/:id',
        component: PostDetailsComponent,
        title: 'Post Details',
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found',
      },
    ],
  },
];
