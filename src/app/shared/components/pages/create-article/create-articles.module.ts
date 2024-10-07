
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputMoleculeComponent } from '../../molecules/input-molecule/input-molecule.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      component: CreateArticleComponent
    }
  ];

@NgModule({
  declarations: [
    CreateArticleComponent,
    ButtonComponent,
    InputComponent,
    InputMoleculeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [CreateArticleComponent]
})
export class CreateArticleModule { 
    nombre: string = '';
  descripcion: string = '';

}