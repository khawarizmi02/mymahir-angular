import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { MaterialModule } from './shared/material.module';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HeaderComponent, MaterialModule, ToolbarComponent],
  // standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;
}
