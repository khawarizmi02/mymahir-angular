import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator-page',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './calculator-page.html',
  styleUrl: './calculator-page.scss',
})
export class CalculatorPage implements OnInit {
  result: number = 0;
  calculateForm: any = FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.calculateForm = this.formBuilder.group({
      textField1: '',
      textField2: '',
    });
  }

  // Addition
  onAdd() {
    var formData = this.calculateForm.value;

    if (this.validateForm(formData)) {
      this.result = parseInt(formData.textField1) + parseInt(formData.textField2);
    }
  }

  // Subtraction
  onSubtract() {
    var formData = this.calculateForm.value;

    if (this.validateForm(formData)) {
      this.result = parseInt(formData.textField1) - parseInt(formData.textField2);
    }
  }

  validateForm(formData: any): boolean {
    return formData.textField1 != '' && formData.textField2 != '';
  }
}
