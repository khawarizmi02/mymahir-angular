import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthApiService } from '../../services/auth-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login-page',
  imports: [
    // MaterialModule,
    // FormsModule,
    ReactiveFormsModule,
    // MatInputModule,
    RouterLink,
    // MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  public loginForm: FormGroup;
  public hidePassword?: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authApiService: AuthApiService,
    private dataService: DataService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authApiService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        if (data.success && data.token) {
          this.dataService.setLocalStorage('token', data.token);
          console.log('token: ', this.dataService.getLocalStorage('token'));
          this.router.navigate(['/student']);
        } else {
          console.error('No getting token or login failed.');
        }
      },
      error: (error) => {
        console.error('Login failed.');
      },
    });
  }

  toggleShowPassword() {
    console.log('togglePassword');
    this.hidePassword = !this.hidePassword;
  }
}
