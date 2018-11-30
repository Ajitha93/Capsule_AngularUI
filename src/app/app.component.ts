import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'TaskManagerUI';
  route: Router;
  constructor( route: Router) {
     this.route = route;  
  }
  AddTask()
{      
    this.route.navigate(['AddTask']); 
}
void(id)
{

}
ViewTask()
{
  this.route.navigate(['ViewTask']); 
}
}
