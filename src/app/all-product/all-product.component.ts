import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../service/apiservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  allProduct:any=[]
  searchKey:any=""
  constructor(private api:ApiservicesService){}

  ngOnInit(): void {
    this.api.getAllProductApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProduct=res
        
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
    this.api.searchKey.subscribe((res:any)=>{
      this.searchKey=res
      console.log(this.searchKey);
      
    })
  }
  addWishlistItem(item:any){
    const token = sessionStorage.getItem('token')
    if(!token){
      alert('Please Login')
    }
    else{
      this.api.addWishlistApi(item).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          Swal.fire({
            text:'Product Added Successfully',
            icon:'success'
          })
          
        },error:(err:any)=>{
          console.log(err);
          Swal.fire({
            text:err.error,
            icon:'error'
          })
          
        }

      })
    }
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
