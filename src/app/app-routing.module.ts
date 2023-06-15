import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SofaCalcComponent} from "./sofa-calc/sofa-calc.component";
import {HeartCalcComponent} from "./heart-calc/heart-calc.component";
import {ChildPhewCalcComponent} from "./child-phew-calc/child-phew-calc.component";

const routes: Routes = [
  {path: 'sofa', component: SofaCalcComponent},
  {path: 'heart', component: HeartCalcComponent},
  {path: 'child-phew', component: ChildPhewCalcComponent},
  {path: '',redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
