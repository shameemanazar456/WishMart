import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../service/apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  wishCount:any=0
  cartCount:any=0
  username:any=""

  constructor(private api:ApiservicesService, private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      const existingUser = JSON.parse(sessionStorage.getItem("existingUser") as string)
      this.username = existingUser.username

      console.log(this.username);
      
      this.api.wishlistcount.subscribe((res:any)=>{
        this.wishCount=res
      })
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount=res
      })

    }
  }

  getSearch(value:any){
    this.api.getSearchKey(value)
  }

  logout(){
    this.username=""
    sessionStorage.removeItem('total')
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('/')

  }


}
