import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../service/apiservices.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartArray:any=[]

  total:any=0


  constructor(private api:ApiservicesService,private routes:Router){}

  ngOnInit(): void {
      this.getCartProducts()
  }
  getCartProducts(){
    this.api.getProductFromCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.cartArray=res
        this.getTotal()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  removeItem(id:any){
    this.api.removeItemFromCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        Swal.fire({
          text:'Item Removed',
          icon:'info'
        })
        this.getCartProducts()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    
  }

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartCount()
        Swal.fire({
          text:'Cart Cleared',
          icon:'info'
        })
        this.getCartProducts()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  incrementItem(id:any){
    this.api.incrementCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCartProducts()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  decrementItem(id:any){
    this.api.decrementCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCartProducts()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  getTotal(){
   this.total= Math.ceil(this.cartArray.map((item:any)=>item.grandTotal).reduce((n1:any,n2:any)=>n1+n2))
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.total))
    this.routes.navigateByUrl('/checkout')
  }

}
