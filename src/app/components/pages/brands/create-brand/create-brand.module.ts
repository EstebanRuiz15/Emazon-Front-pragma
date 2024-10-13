
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CreateBrandComponent } from './create-brand.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
      path: '',
      component: CreateBrandComponent
    }
  ];

@NgModule({
  declarations: [
    CreateBrandComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  bootstrap: [CreateBrandComponent]
})
export class CreateBrandModule { 
}