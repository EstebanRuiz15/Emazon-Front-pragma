
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputMoleculeComponent } from '../../molecules/input-molecule/input-molecule.component';
import { InputComponent } from '../../atoms/input/input.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component';

const routes: Routes = [
    {
      path: '',
      component: CreateCategoryComponent
    }
  ];

@NgModule({
  declarations: [
    CreateCategoryComponent,
    ButtonComponent,
    InputComponent,
    InputMoleculeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [CreateCategoryComponent]
})
export class CreateCategoryModule { 
    nombre: string = '';
  descripcion: string = '';

}