import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import {AddTaskComponent} from './add-task/add-task.component';

function getRoutes() {

  const routes: Routes = [    
      { path: '', redirectTo: '/ViewTask', pathMatch: 'full'},
      { path: 'ViewTask', component: ViewTaskComponent } ,
      { path: 'AddTask', component: AddTaskComponent } ,
      { path: 'EditTask/:id', component: AddTaskComponent } ,
  ];

  return routes;

}


@NgModule({
  imports: [RouterModule.forRoot(getRoutes())],  
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
