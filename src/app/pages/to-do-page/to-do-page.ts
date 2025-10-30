import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { DataService } from '../../services/data.service';
import { Todo } from '../../interfaces/todo.data';
import { TodoApiService } from '../../services/todo-api.service';

// interface Todo {
//   title: string;
//   selected: boolean;
// }

@Component({
  selector: 'app-to-do-page',
  imports: [MaterialModule],
  templateUrl: './to-do-page.html',
  styleUrls: ['./to-do-page.scss', '../../app.scss'],
})
export class ToDoPage implements OnInit {
  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private todoApiService: TodoApiService
  ) {}

  ngOnInit() {
    this.fetchTodo();

    // const saved = this.dataService.getLocalStorage('todoList');

    // if (saved) {
    //   this.todoList = JSON.parse(saved);
    // }
  }

  public todoList: Todo[] = [];
  public isLoading: boolean = false;

  fetchTodo() {
    this.isLoading = true;

    // 1. Call the service method
    this.todoApiService.getTodos().subscribe({
      // 2. Handle successful response
      next: (data) => {
        this.todoList = data.todos;
        this.isLoading = false;
      },
      // 3. Handle errors
      error: (err) => {
        console.error('Failed to load todos:', err);
        this.isLoading = false;
      },
    });
  }

  onAdd(): void {
    // 1. Open the dialog, passing the component class
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: { title: '' }, // Data to initialize the dialog with
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.todoList.push({ title: result, selected: false });
        // this.dataService.setLocalStorage('todoList', JSON.stringify(this.todoList));
      }
    });
  }

  onSelected(id: number) {
    // this.todoApiService.getTodos().subscribe({
    //   // 2. Handle successful response
    //   next: (data) => {
    //     console.log(data);
    //     this.todoList = data.todos;
    //     this.isLoading = false;
    //   },
    //   // 3. Handle errors
    //   error: (err) => {
    //     console.error('Failed to load todos:', err);
    //     this.isLoading = false;
    //   },
    // })
  }

  onDelete(index: number) {
    let confirmation = confirm('Are you sure want to delete this item from the list?');
    if (confirmation) {
      this.todoList.splice(index, 1);
      // this.dataService.setLocalStorage('todoList', this.todoList);
    }
  }
}
