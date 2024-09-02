import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiservicesService } from '../service/apiservices.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private api:ApiservicesService, private router:Router){}

  loginForm = this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]]
  })

  login(){
    if(this.loginForm.valid){
      this.api.loginApi(this.loginForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          this.api.getCartCount()
          Swal.fire({
            title:'Wow',
            text:'Login Success',
            icon:'success'
          })
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)

          this.router.navigateByUrl('/')
          
        },error:(err)=>{
          Swal.fire({
            title:'Oops',
            text:'Login Failed',
            icon:'error'
          })
        }
      })
    }
    

  }

}
