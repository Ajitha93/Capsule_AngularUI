import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskServiceService } from 'src/view-task-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { AddUserComponent } from './add-user/add-user.component';
import { FilterUserPipe } from 'src/app/pipe/filteruser.pipe';
import { AddProjectComponent } from './add-project/add-project.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    FilterPipe,
    AddUserComponent,
    FilterUserPipe,
    AddProjectComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,   
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
 
  ],
  providers: [ViewTaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
