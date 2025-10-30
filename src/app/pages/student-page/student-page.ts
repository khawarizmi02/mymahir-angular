import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { Student } from '../../interfaces/student.data';
import { StudentApiService } from '../../services/student-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog.component';

@Component({
  selector: 'app-student-page',
  imports: [MaterialModule, RouterLink],
  templateUrl: './student-page.html',
  styleUrl: './student-page.scss',
})
export class StudentPage implements OnInit {
  public displayedColumns = ['no', 'name', 'email', 'phone', 'student_no', 'action'];
  public StudentsData: Student[] = [];
  public isLoading: boolean = false;
  public dataSources = new MatTableDataSource(this.StudentsData);

  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action);
  }

  constructor(private studentApiService: StudentApiService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.isLoading = true;
    this.studentApiService.getStudents().subscribe({
      next: (data) => {
        console.log(data);
        this.StudentsData = data.students;
        this.isLoading = false;

        this.dataSources = new MatTableDataSource(this.StudentsData);
        this.dataSources.data = this.dataSources.data.map((student: any, index) => ({
          ...student,
          no: index + 1,
        }));

        console.log(this.dataSources.data);
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  onDeleteStudent(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete confirmation',
        message: 'Are you sure want to delete this student?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentApiService.deleteStudent(id).subscribe({
          next: (data) => {
            if (data.success) {
              this.openSnackBar('Delete success!');
              this.fetchStudents();
            }
          },
          error: (error) => {
            console.error(error);
            this.openSnackBar("Opps! Can't delete this student.");
          },
        });
      }
    });
  }
}
