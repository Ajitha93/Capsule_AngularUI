import { TestBed, async, ComponentFixture, inject  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { AddTaskComponent } from 'src/app/add-task/add-task.component';
import { ViewTaskComponent } from 'src/app/view-task/view-task.component';
import { ViewTaskServiceService } from 'src/view-task-service.service';
import { AddTaskService } from 'src/add-task.service';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let addcomponent: AddTaskComponent;
  let addfixture: ComponentFixture<AddTaskComponent>;
  let viewcomponent: ViewTaskComponent;
  let viewfixture: ComponentFixture<ViewTaskComponent>;

  const parentTaskDetail: any = [
    {
      "ParentTask": "Parent 1",
      "ParentTaskId": 1
     
    },
    {
      "ParentTask": "Parent 2",
      "ParentTaskId": 2
     
    },
    {
     "ParentTask": "Parent 3",
      "ParentTaskId": 3
     
    }
  ];
  const taskDetail: any = [
    {
      "TaskId": 1,
      "ParentTask": "Parent 1",
      "Task": "Test",
      "StartDate": "09/07/2018",
      "EndDate": "09/08/2018",
      "Priority": 10
    },
    {
      "TaskId": 2,
      "ParentTask": "Parent 3",
      "Task": "Abc",
      "StartDate": "10/07/2018",
      "EndDate": "10/08/2018",
      "Priority": 20
    },
    {
      "TaskId": 3,
      "ParentTask": "Parent 2",
      "Task": "Task 123",
      "StartDate": "11/07/2018",
      "EndDate": "11/08/2018",
      "Priority": 15
    }
  ];

  let mockService = {
    GetParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },   
    AddTask(Task: string,Priority:number,ParentTaskId:number,StartDate:any,EndDate:any,TaskId:number,CreatedBy:string,CreatedDate:any): Observable<any> {      
      return of(taskDetail);
    }   
  }
  let mockServiceView = {
    ViewTask(): Observable<any> {
      return of(taskDetail);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        AddTaskComponent,
        ViewTaskComponent,
        FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: AddTaskService, useValue: mockService },{ provide: ViewTaskServiceService, useValue: mockServiceView } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addfixture = TestBed.createComponent(AddTaskComponent);
    addcomponent = addfixture.componentInstance;
    addfixture.detectChanges();
    viewfixture = TestBed.createComponent(ViewTaskComponent);
    viewcomponent = viewfixture.componentInstance;
    viewfixture.detectChanges();
  });
  it('should create the app', async(() => {
     expect(component).toBeTruthy();
     expect(addcomponent).toBeTruthy();
     expect(viewcomponent).toBeTruthy();
  }));


  it('should be get', inject([AddTaskService], (service: AddTaskService) => {
    service.GetParentTask().subscribe(data => {addcomponent.parentTaskList = data;});
    addfixture.detectChanges();
    expect(service).toBeTruthy();
  }));
  
  // it('should be post', inject([AddTaskService], (service: AddTaskService) => {
  //   service.AddTask("karma test",12,2,"09/07/2018","09/10/2018",null,null,null).subscribe(data => {});
  //   addfixture.detectChanges();
  //   expect(service).toBeTruthy();
  // }));  

  it('should be get', inject([ViewTaskServiceService], (viewservice: ViewTaskServiceService) => {
    viewservice.ViewTask(null,null,null,null,null).subscribe(data => {viewcomponent.response = data;});
    viewfixture.detectChanges();
    expect(viewservice).toBeTruthy();
  }));   

 
    
});









