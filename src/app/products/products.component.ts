import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  // products: Array<any>=[
  //   {id: 1, name: "Computer", price: 56540, checked:false},
  //   {id: 2, name: "Printer", price: 750, checked:true},
  //   {id: 3, name: "Phone", price: 4500, checked:false},
  // ];

  // products$!: Observable<Array<Product>>;

   products: Array<Product>=[];
   public keyword: string=""

  constructor(private productService:ProductService) {
  }

  ngOnInit(): void {
  this.getProducts();
  }

  getProducts():void{

    this.productService.getProducts(1,3)
      .subscribe({
        next: data => {this.products=data },
        error: err => {console.log(err);
        }
      })


    // this.products$=this.productService.getProducts();
  }
  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
       this.getProducts();
      }
    })

  }

  handleDelete(product: Product) {
    if(confirm("Are you sure?"))
    this.productService.deleteProduct(product).subscribe({
      next: value   => {
       // this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id)
      }
    });
  }

  searchProduct() {
    this.productService.searchProducts(this.keyword).subscribe({
      next: value => this.products=value
    })
  }
}
