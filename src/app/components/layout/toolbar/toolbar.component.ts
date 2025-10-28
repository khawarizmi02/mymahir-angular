import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
