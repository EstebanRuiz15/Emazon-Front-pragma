import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'create-category',
    loadChildren: () => import('./components/pages/create-categoryy/create-category.module').then(m => m.CreateCategoryModule)
  },
  {
    path: 'list-categories',
    loadChildren: () => import('./components/pages/list-categories/list-categories.module').then(m => m.ListCategoriesModule)
  },
  {
    path: 'create/brand',
    loadChildren: () => import('./components/pages/brands/create-brand/create-brand.module').then(m => m.CreateBrandModule)
  },
  {
    path:'list/brands',
    loadChildren: () => import('./components/pages/brands/list-brands/list-brands.module').then(m=> m.ListBrandsModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
