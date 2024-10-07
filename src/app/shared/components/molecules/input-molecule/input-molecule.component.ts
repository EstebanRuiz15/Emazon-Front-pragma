import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-molecule',
  templateUrl: './input-molecule.component.html',
  styleUrls: ['./input-molecule.component.scss']
})
export class InputMoleculeComponent {
  @Input() nameLabel: string = 'Name';  
  @Input() descLabel: string = 'Description';  
  @Output() nameChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();

  private _name: string = '';
  private _description: string = '';
  
  @Input()
  get name(): string {
    return this._name;
  }
  
  set name(value: string) {
    this._name = value;
    this.nameChange.emit(this._name);
  }

  @Input()
  get description(): string {
    return this._description;
  }
  
  set description(value: string) {
    this._description = value;
    this.descriptionChange.emit(this._description);
  }

  showInputs: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.showInputs = true; 
    }, 1);
  }
}