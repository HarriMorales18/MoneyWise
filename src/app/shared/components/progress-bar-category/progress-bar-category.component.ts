import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-progress-bar-category',
  templateUrl: './progress-bar-category.component.html',
  styleUrls: ['./progress-bar-category.component.scss'],
})
export class ProgressBarCategoryComponent {

  @Input() categoria: string = '';
  @Input() porcentaje: number = 0; // 0 a 100
  @Input() color: string = 'primary'; // 'primary', 'success', 'danger', etc.
  @Input() monto: number = 0;

}