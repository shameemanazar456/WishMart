import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../service/apiservices.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any={}
  constructor(private api:ApiservicesService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      const {id} = res
      this.viewProduct(id)

    })
  }
  viewProduct(id:any){
    this.api.viewProductApi(id).subscribe({
      next:(res:any)=>{
        this.product=res        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToWishlist(reqBody:any){
    this.api.addWishlistApi(reqBody).subscribe({
      next:(res:any)=>{
        this.api.getWishlistCount()
        Swal.fire({
          text:"Product added to Wishlist",
          icon:"success"
        })
      },
      error:(err:any)=>{
        console.log(err);
            
      }
    })

  }
  addToCart(item:any){
    const token = sessionStorage.getItem("token")
    if(token){
      item["Quantity"] = 1
      this.api.addProductToCartApi(item).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartCount()
          Swal.fire({
            text:'Product Added Successfully',
            icon:'success'
          })
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            text:err.error,
            icon:'error'
          })          
        }
      })
    }

  }
}
