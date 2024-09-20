import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'chats/:id',
    loadComponent: () => import('./pages/home/chats/chats.page').then(m => m.ChatsPage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.page').then( m => m.SigninPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signin/signup/signup.page').then( m => m.SignupPage)
  },
];
