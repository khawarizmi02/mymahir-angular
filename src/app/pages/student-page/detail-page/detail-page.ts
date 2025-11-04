import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../../interfaces/student.data';
import { StudentApiService } from '../../../services/student-api.service';
import { MaterialModule } from '../../../shared/material.module';
import { ConvertPipe } from '../../../pipes/convert-pipe';

@Component({
  imports: [MaterialModule, RouterLink, ConvertPipe],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})
export class DetailPage implements OnInit {
  public id: any;
  public isLoading: boolean = false;
  public student?: Student;

  constructor(private activeRoute: ActivatedRoute, private studentApiService: StudentApiService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.student = {
      id: this.id,
      name: '',
      student_no: '',
      email: '',
      phone: '',
    };

    this.fetchStudent();
  }

  fetchStudent() {
    this.isLoading = true;
    this.studentApiService.getStudentWithId(this.id).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(data);
        this.student = data.student;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
