import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-molecule',
  templateUrl: './input-molecule.component.html',
  styleUrls: ['./input-molecule.component.scss']
})
export class InputMoleculeComponent implements OnInit {
  @Input() title: string = '';
  @Input() nameLabel: string = 'Name';
  @Input() descLabel: string = 'Description';
  @Input() nameControl!: FormControl;
  @Input() descriptionControl!: FormControl;
  @Input() required: boolean = false;

  ngOnInit(): void {
    console.log('Name Control:', this.nameControl);
    console.log('Description Control:', this.descriptionControl);
  }
}