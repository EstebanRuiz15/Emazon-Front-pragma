import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/atoms/button/button.component';
import { TableComponent } from '../components/atoms/table/table.component';
import { InputComponent } from '../components/atoms/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMoleculeComponent } from '../components/molecules/forms-molecule/input-molecule.component';

@NgModule({
  declarations: [ButtonComponent, TableComponent, InputComponent, InputMoleculeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ButtonComponent, TableComponent, InputComponent, InputMoleculeComponent, CommonModule, FormsModule, ReactiveFormsModule]  
})
export class SharedModule { }