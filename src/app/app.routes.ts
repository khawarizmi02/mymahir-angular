import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CalculatorPage } from './pages/calculator-page/calculator-page';
import { DirectivePage } from './pages/directive-page/directive-page';
import { ToDoPage } from './pages/to-do-page/to-do-page';
import { StudentPage } from './pages/student-page/student-page';
import { DetailPage } from './pages/student-page/detail-page/detail-page';
import { AddPage } from './pages/student-page/add-page/add-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'calculator',
    component: CalculatorPage,
  },
  {
    path: 'directive',
    component: DirectivePage,
  },
  {
    path: 'todo',
    component: ToDoPage,
  },
  {
    path: 'student',
    component: StudentPage,
  },
  {
    path: 'student/add',
    component: AddPage,
    canActivate: [authGuard],
  },
  {
    path: 'student/:id',
    component: DetailPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
