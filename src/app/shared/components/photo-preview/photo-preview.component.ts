import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent {

  @Input() src: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

  get dimension() {
    switch (this.size) {
      case 'small': return '40px';
      case 'medium': return '80px';
      case 'large': return '100%';
      default: return '80px';
    }
  }

}