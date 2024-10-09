import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = 'Click Me';
  @Input() buttonColor: string = '#9D3FE7';
  @Input() hoverColor: string = '#AE60EB';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() position: { top?: string, left?: string } = {};
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  
  hover: boolean = false;

  get buttonStyle() {
    return {
      'background-color': this.disabled ? '#cccccc' : (this.hover ? this.hoverColor : this.buttonColor),
      'position': 'absolute',
      'top': this.position.top,
      'left': this.position.left,
      'cursor': this.disabled ? 'not-allowed' : 'pointer',
      'opacity': this.disabled ? '0.7' : '1'
    };
  }

  handleClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

  onMouseOver() {
    if (!this.disabled) {
      this.hover = true;
    }
  }

  onMouseLeave() {
    this.hover = false;
  }
}