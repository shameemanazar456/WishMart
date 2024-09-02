import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  //serverUrl = 'http://localhost:3000'

  serverUrl = 'https://wishmartbackend.onrender.com'

  wishlistcount = new BehaviorSubject(0)

  cartCount = new BehaviorSubject(0)

  searchKey = new BehaviorSubject("")


  constructor(private http:HttpClient) {
    this.getWishlistCount()
    this.getCartCount()
  }
   
   getAllProductApi(){
     return this.http.get(`${this.serverUrl}/all-products`)
   }

   registerApi (reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
   }

   loginApi (reqBody:any){
    return this.http.post(`${this.serverUrl}/login`,reqBody)
   }

   addHeaderToRequest(){
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
     
    }
    return {headers}
   }

   addWishlistApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-to-wishlist`,reqBody,this.addHeaderToRequest())
   }

   getWishlistApi(){
    return this.http.get(`${this.serverUrl}/get-wishlistItem`,this.addHeaderToRequest())
   }


   deleteWishlistItemApi(id:any){
    return this.http.delete(`${this.serverUrl}/delete-wishlistItem/${id}`)
   }

   //api to view a product

    viewProductApi(id:any){
      return this.http.get(`${this.serverUrl}/view-product/${id}`)


    }

    getWishlistCount(){
      this.getWishlistApi().subscribe({
        next:(res:any)=>{
          this.wishlistcount.next(res.length)          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    getCartCount(){
      this.getProductFromCartApi().subscribe({
        next:(res:any)=>{
          this.cartCount.next(res.length)          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
     // console.log(this.cartCount);
      
    }

    //api to add product to cart

    addProductToCartApi (reqBody:any){
      return this.http.post(`${this.serverUrl}/cart`, reqBody, this.addHeaderToRequest())
    }
    getProductFromCartApi(){
      return this.http.get(`${this.serverUrl}/getCart`,this.addHeaderToRequest())
    }

    //api to remove item from cart

    removeItemFromCartApi(id:any){
      return this.http.delete(`${this.serverUrl}/deletecartitem/${id}`)
    }

    //api to emptycart

    emptyCartApi(){
      return this.http.delete(`${this.serverUrl}/emptyCart`,this.addHeaderToRequest())
    }

    incrementCartItemApi(id:any){
      return this.http.get(`${this.serverUrl}/cart/increment/${id}`)
    }
    decrementCartItemApi(id:any){
      return this.http.get(`${this.serverUrl}/cart/decrement/${id}`)
    }

    getSearchKey(value:any){
      this.searchKey.next(value)
    }
}
