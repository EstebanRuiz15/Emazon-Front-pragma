import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ListBrandsComponent } from "./list-brands.component";

const routes: Routes = [
    {
      path: '',
      component: ListBrandsComponent
    }
  ];

  @NgModule({
    declarations: [
      ListBrandsComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(routes)
    ]
  })
  export class ListBrandsModule { }