import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProduct:any[], searchKey:string): any[] {
    const result:any=[]

    if(!allProduct || searchKey ==""){
      return allProduct
    }
    allProduct.forEach((item:any)=>{
      if(item.category.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
  }

}
