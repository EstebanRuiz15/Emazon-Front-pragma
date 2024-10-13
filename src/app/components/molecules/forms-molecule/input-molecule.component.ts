import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-input-molecule',
  templateUrl: './input-molecule.component.html',
  styleUrls: ['./input-molecule.component.scss']
})
export class InputMoleculeComponent implements OnInit {
  @Input() title: string = '';
  @Input() namePlace:string='';
  @Input() namePlace2:string='';
  @Input() nameLabel: string = 'Name';
  @Input() descLabel: string = 'Description';
  @Input() nameControl!: FormControl;
  @Input() descriptionControl!: FormControl;
  @Input() required: boolean = false;
  @Input() textButon:string ='';
  @Input() getNameErrorMessage!: () => string;
  @Input() getDescriptionErrorMessage!: () => string;
 
  articleForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      name: this.nameControl,
      description: this.descriptionControl
    });
  }



  onSubmit(): void {
    if (this.articleForm.valid) {
      this.formSubmit.emit();
      this.articleForm.reset();
    } else {
      this.articleForm.markAllAsTouched();
    }
  }
}