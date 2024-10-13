
import { NgModule } from '@angular/core';
import { CreateCategoryComponent } from './create-category.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
      path: '',
      component: CreateCategoryComponent
    }
  ];

@NgModule({
  declarations: [
    CreateCategoryComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [CreateCategoryComponent]
})
export class CreateCategoryModule { 
}