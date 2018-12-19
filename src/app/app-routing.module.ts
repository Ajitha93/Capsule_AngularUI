import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {AddUserComponent} from './add-user/add-user.component';
import {AddProjectComponent} from './add-project/add-project.component';

const appRoutes = [
  { path: '', redirectTo: '/ViewTask', pathMatch: 'full'},
  { path: 'ViewTask', component: ViewTaskComponent } ,
  { path: 'AddTask', component: AddTaskComponent } ,
  { path: 'EditTask/:id', component: AddTaskComponent },
  { path: 'AddUser', component: AddUserComponent } , 
  { path: 'AddProject', component: AddProjectComponent } ,
  
];

// function getRoutes() {

//   const routes: Routes = [    
//       { path: '', redirectTo: '/ViewTask', pathMatch: 'full'},
//       { path: 'ViewTask', component: ViewTaskComponent } ,
//       { path: 'AddTask', component: AddTaskComponent } ,
//       { path: 'EditTask/:id', component: AddTaskComponent } ,
//   ];

//   return routes;

// }



@NgModule({
  //imports: [RouterModule.forRoot(getRoutes())],  
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
