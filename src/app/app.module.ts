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


@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    FilterPipe
    
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
