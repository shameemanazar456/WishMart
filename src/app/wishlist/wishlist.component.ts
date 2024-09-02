import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../service/apiservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
   wishlist:any = []
  constructor(private api:ApiservicesService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlistApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.wishlist=res
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteItem(id:any){

    this.api.deleteWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getWishlist()
        this.api.getWishlistCount()
      },error:(err:any)=>{
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
          this.deleteItem(item._id)
          this.api.getCartCount()
          Swal.fire({
            text:'Product Added Successfully',
            icon:'success'
          })
        },
        error:(err:any)=>{
          console.log(err);
          if(err.error == 'Product Already In Cart'){
            Swal.fire({
              text:'Product Added Successfully',
              icon:'error'
            })
           
            this.deleteItem(item._id)
          }
          else{
            Swal.fire({
              text:err.error,
              icon:'error'
            })
          }
                    
        }
      })
    }

  }
}
