import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = 'Click Me'; 
  @Input() buttonColor: string = '#9D3FE7';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() position: { top?: string, left?: string } = {};
  hover: boolean = false; 
 
  handleClick() {
    this.buttonClick.emit();
  }

}