import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent {

  @Input() label: string = '';
  @Input() value: string | null = null;
  @Input() error?: string;
  @Output() onChange = new EventEmitter<string>();

  valueChange(event: any) {
    this.onChange.emit(event.detail.value);
  }

}