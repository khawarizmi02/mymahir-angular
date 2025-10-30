import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  // imports: [MaterialModule, NgModule, ɵInternalFormsSharedModule],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.scss',
})
export class TodoDialogComponent implements OnInit {
  public todoForm: any = FormBuilder;
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: '',
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDialogCancel() {
    this.dialogRef.close();
  }

  onDialogAdd() {
    let formData = this.todoForm.value;
    if (formData.title != '') {
      this.dialogRef.close(formData.title);
    }
  }
}
