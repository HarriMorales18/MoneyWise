import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: any;
  @Input() error?: string;
  @Input() disabled: boolean = false;
  @Input() name: string = '';
  @Input() autocomplete: string = 'off';
  @Input() autocapitalize: string = 'off';
  @Input() spellcheck: boolean = false;
  @Output() onChange = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.placeholder && this.type === 'number') {
      this.placeholder = 'Ej: 125.00';
    }
  }

  valueChange(event: any) {
    this.onChange.emit(event.detail.value);
  }

  blur() {
    this.onBlur.emit();
  }

}