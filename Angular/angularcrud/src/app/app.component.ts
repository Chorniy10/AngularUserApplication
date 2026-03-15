import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Init } from 'v8';
import { EmployeeService } from './service/employee.service';
import { response } from 'express';
import { Employee } from './models/employee';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  Employeeary : Employee[] = [];

  EmployeeFormGroup : FormGroup;
   constructor(private empserve : EmployeeService, private fb : FormBuilder){
    this.EmployeeFormGroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNumber: [""],
      email: [""]
    });
   }

  ngOnInit(): void {
    this.getemployees();
  }

  getemployees(){
    this.empserve.GetEmployee().subscribe(response =>{
      console.log(response);
      this.Employeeary = response;
    })
  }
  OnSubmit(){
    console.log(this.EmployeeFormGroup.value)
    if (this.EmployeeFormGroup.value.id != null && this.EmployeeFormGroup.value.id != ""){
      this.empserve.UpdateEmployee(this.EmployeeFormGroup.value).subscribe(response =>{
      console.log(response);
      this.getemployees();
      this.EmployeeFormGroup.setValue({
        id : "",
        name : "",
        mobileNumber : "",
        email : "",
      })
    })
    }
    else{
      this.empserve.CreateEmployee(this.EmployeeFormGroup.value).subscribe(response =>{
      console.log(response);
      this.getemployees();
      this.EmployeeFormGroup.setValue({
        id : "",
        name : "",
        mobileNumber : "",
        email : "",
      })
    })
  }
  }

  FillForm(emp : Employee){
    this.EmployeeFormGroup.setValue({
      id : emp.id,
      name : emp.name,
      mobileNumber : emp.mobileNumber,
      email : emp.email,
    })
  }

  DeleteForm(id:string){
    this.empserve.DeleteEmployee(id).subscribe(response =>{
      console.log(response);
      this.getemployees();
    })
  }

  title = 'angularcrud';
}
