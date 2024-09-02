import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiservicesService } from '../service/apiservices.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private api:ApiservicesService,private router:Router){

  }

  registerForm = this.fb.group({
    username:['',[Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{4,}')]]
  })

  register(){
    console.log(this.registerForm.valid);
    
    
    if(this.registerForm.valid){
      console.log(this.registerForm);
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title:'Wow',
            text:"Login Successfull",
            icon:'success'
          })
          this.router.navigateByUrl('/login')
          
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            title:'Oops',
            text:"User ALready exist",
            icon:'info'
          })
          
        }
      })
    }else{
      Swal.fire({
        title:'Error',
        text:"Something went Wrong",
        icon:'error'
      })    }
  }

}

