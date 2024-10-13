import { ListCategoriesComponent } from "./list-categories.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
      path: '',
      component: ListCategoriesComponent
    }
  ];

  @NgModule({
    declarations: [
      ListCategoriesComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(routes)
    ]
  })
  export class ListCategoriesModule { }