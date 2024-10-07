import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './shared/components/pages/create-article/create-article.component';

const routes: Routes = [{
  path: 'create-article',
    loadChildren: () => import('./shared/components/pages/create-article/create-articles.module').then(m => m.CreateArticleModule)
  
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
