import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, Router ,ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddUserService } from 'src/app/add-user.service';
import { FilterUserPipe } from 'src/app/pipe/filteruser.pipe';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  LastName:string;
  FirstName:string;
  EmployeeId:number;
  UserId:number;
  //Search:any;
  formGrp: FormGroup;
  formControlName="name";
  UserLabel="Add";
  route: Router;
  snapshot:ActivatedRoute;
  response: any=null;
  errormsg:string="Required";
  constructor(private formBuilder: FormBuilder, route: Router, private addUserSvc: AddUserService,
    private http: HttpClient,snapshot:ActivatedRoute
  ) { this.route = route;this.snapshot=snapshot;}

    AddUser(post) {
      if (this.formGrp.valid) {
          this.FirstName = post.FirstName;
          this.LastName=post.LastName;
          this.EmployeeId=post.EmployeeId;
          this.UserId=post.UserId;
           
          this.addUserSvc.AddUser(this.FirstName,this.LastName,this.EmployeeId,this.UserId).subscribe(res => { 
            this.GetUsers();
            this.ResetUser();
          //this.route.navigate(['ViewUser']); 
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
    ResetUser(){
    this.formGrp.reset();
    }  
    GetUsers()
    {
      this.addUserSvc.ViewUser().subscribe((res:Response) => {            
        if (res != null) {             
                  this.response = res;                    
              }
      }, error => {
          console.log("Error Occured");
      });
    }
    EditUser(user)
    {      
      let editdata=
      {
        FirstName:user.First_Name,
        LastName:user.Last_Name,
        EmployeeId:user.Employee_Id,
        UserId:user.User_Id,
      }
      this.formGrp.patchValue(editdata);
      this.UserLabel = 'Edit';  
     }
     DeleteUser(user)
     {
      this.addUserSvc.DeleteUser(user).subscribe((res) => {  
        this.GetUsers();
      }, error => {
          console.log("Error Occured");
      });

     }
     ngOnInit() {
    this.formGrp = this.formBuilder.group({
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
      EmployeeId: [null, Validators.required],
      UserId :[null]      
  });
  
 this.GetUsers();

}
}
