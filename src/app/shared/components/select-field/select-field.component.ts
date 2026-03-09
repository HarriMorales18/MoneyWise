import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent {

  @Input() label: string = '';
  @Input() placeholder?: string;
  @Input() options: Array<{ label: string, value: any }> = [];
  @Input() value: any;
  @Input() error?: string;
  @Output() onChange = new EventEmitter<any>();

  valueChange(event: any) {
    this.onChange.emit(event.detail.value);
  }

}