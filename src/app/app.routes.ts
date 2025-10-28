import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CalculatorPage } from './pages/calculator-page/calculator-page';
import { DirectivePage } from './pages/directive-page/directive-page';

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
];
