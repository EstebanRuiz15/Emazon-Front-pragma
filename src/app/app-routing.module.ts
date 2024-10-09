import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'create-category',
    loadChildren: () => import('./components/pages/create-categoryy/create-category.module').then(m => m.CreateCategoryModule)
  
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
