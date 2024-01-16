import { Component, OnInit , } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  myForm!: FormGroup;

  constructor(private router :Router,private formBuilder: FormBuilder){
  
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  login() {
    if( this.myForm.value.username == 'admin' && this.myForm.value.password == '123' ){
      localStorage.setItem('name' , this.myForm.value.username);
      localStorage.setItem('password' , this.myForm.value.password);

      this.router.navigate(['dashboard'])
    }
    else{
      alert("user Name:admin , Password:123");
    }

  }
}

