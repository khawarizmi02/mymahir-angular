import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentApiService } from '../../../services/student-api.service';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-page',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterLink],
  templateUrl: './add-page.html',
  styleUrl: './add-page.scss',
})
export class AddPage {
  public studentForm: FormGroup;
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action);
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: StudentApiService,
    private router: Router
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      student_no: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.studentForm.value);
    this.apiService.createNewStudent(this.studentForm.value).subscribe({
      next: (data) => {
        if (data.success) this.openSnackBar('Student submitted.');
      },
      error: (error) => {
        console.error(error);
        this.openSnackBar('Error with creating student.');
      },
    });

    // try {
    //   const studentData = this.studentForm.value;

    //   console.log(studentData);
    //   this.openSnackBar('Student submitted.');
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
