import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-directive-page',
  imports: [MaterialModule, NgClass, NgStyle],
  templateUrl: './directive-page.html',
  styleUrls: ['./directive-page.scss', '../../../styles.scss'],
})
export class DirectivePage {
  public cars = [
    { name: 'Proton', description: 'Wira', origin: 'Malaysia' },
    { name: 'Perodua', description: 'Axia', origin: 'Malaysia' },
    { name: 'Honda', description: 'Civic', origin: 'Japan' },
    { name: 'Toyota', description: 'Supra', origin: 'Japan' },
    { name: 'BMW', description: 'M3', origin: 'German' },
  ];
  public showListCars: boolean = true;

  toggleShowList() {
    this.showListCars = !this.showListCars;
  }
}
