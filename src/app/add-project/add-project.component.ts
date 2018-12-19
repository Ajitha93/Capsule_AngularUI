import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router ,ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
 import { AddProjectService } from 'src/app/add-project.service';
import { FilterUserPipe } from 'src/app/pipe/filteruser.pipe';
import { DatePipe } from '@angular/common';
import { AddUserService } from 'src/app/add-user.service';

declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  ProjectName:string;
  StartDate:any;
  EndDate:any;
  EmployeeId:number;
  Priority:number;
  ProjectId:number;
  chckbox:any;
  isDisabled = false;
  formGrp: FormGroup;
  formControlName="name";
  ProjectLabel="Add";
  radioMgrSearch:any;
  route: Router;
  snapshot:ActivatedRoute;
  response: any=null;
  managerDetails:any=null;
  errormsg:string="Required";
  editdata:any=null;
  constructor(private formBuilder: FormBuilder, route: Router, private addProjSvc: AddProjectService,
    private http: HttpClient,snapshot:ActivatedRoute,private addUserSvc: AddUserService
  ) { this.route = route;this.snapshot=snapshot;}

  handleChange(value: boolean): void {
    const startdateinpt = this.formGrp.get('StartDate');
    const enddateinpt = this.formGrp.get('EndDate');
  
    if (value) {
      startdateinpt.enable();
      enddateinpt.enable();     
    } else {
      startdateinpt.disable();
      enddateinpt.disable();      
    }
  }
  AddProject (post) {
      if (this.formGrp.valid) {
          this.ProjectName = post.ProjectName;
          this.StartDate=post.StartDate;
          this.EndDate=post.EndDate;
          this.EmployeeId=post.EmployeeId;
          this.Priority=post.Priority;
          this.ProjectId=post.ProjectId;
           
          this.addProjSvc.AddProject(this.ProjectName,this.StartDate,this.EndDate,this.EmployeeId,this.Priority,this.ProjectId).subscribe(res => { 
            this.GetProjects(); 
            this.formGrp.reset();         
          }, error => {
              console.log("Error Occured");
          });          
        }
      else {        
          for (let i in this.formGrp.controls) {
              if (!this.formGrp.controls[i].valid)
              {
                  this.formGrp.controls[i].markAsTouched();
  
              }
          }
      }
    }
    ResetProject(){
    this.formGrp.reset();
    }  
    GetProjects()
    {
      this.addProjSvc.ViewProject().subscribe((res:Response) => {            
        if (res != null) {             
                  this.response = res;                    
              }
      }, error => {
          console.log("Error Occured");
      });
    }
    
    EditProject(project)
    {      
       this.editdata=
      {
        ProjectName:project.Project_Name,
        StartDate:project.Start_Date,
        EndDate:project.End_Date,
        EmployeeId:project.Employee_Id,
        Priority:project.Priority,
        ProjectId:project.Project_Id,
      }
      this.formGrp.patchValue(this.editdata);
      this.ProjectLabel = 'Edit';  
     }
     DeleteProject(project)
     {
      this.addProjSvc.DeleteProject(project).subscribe((res) => {  
        this.GetProjects();
      }, error => {
          console.log("Error Occured");
      });
     }
     SearchUser()
     {
      this.addUserSvc.ViewUser().subscribe((res:Response) => {            
        if (res != null) { 
                  //this.EmployeeId = this.formGrp.get('EmployeeId').value;            
                  this.managerDetails = res;    
                  $("#managerModal").modal();              
              }
      }, error => {
          console.log("Error Occured");
      });
     }
     SelectedManger(user)
     {
      this.formGrp = this.formBuilder.group({       
        EmployeeId: [user.User_Id],    
        ProjectName: [this.editdata.ProjectName],
        StartDate: [this.editdata.StartDate],
        EndDate: [this.editdata.EndDate],        
        ProjectId :[this.editdata.ProjectId]  ,
        Priority: [this.editdata.Priority],        
    });      
      $("#managerModal").modal('hide');   
     }
     ngOnInit() {
    this.formGrp = this.formBuilder.group({
      ProjectName: [null],
      StartDate: [{value:null,disabled:!this.isDisabled}],
      EndDate: [{value:null,disabled:!this.isDisabled}],
      EmployeeId: [null],
      ProjectId :[null]  ,
      Priority: [0, Validators.required],    
  });
  
 this.GetProjects();

}

}
