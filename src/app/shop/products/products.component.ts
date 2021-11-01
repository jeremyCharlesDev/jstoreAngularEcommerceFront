import { CartService } from './../../services/cart.service';
import { Products } from './../../model/products';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../services/products.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() products: Products[] = [];
  @Input() isPaginate = true;
  prefUrlImage = environment.api_image;
  prodSub: Subscription;
  currentPage = 0;
  pages = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  changePage(numberPage): void {
    const prod = this.prodService.getProductByPage(numberPage);
    if (prod.length){
      this.products = prod;
      this.currentPage = numberPage;
    }
  }

  nextPage(): void {
    const prod = this.prodService.getProductByPage(this.currentPage + 1);
    if (prod.length){
      this.products = prod;
      this.currentPage += 1;
    }
  }
  prevPage(): void {
    const prod = this.prodService.getProductByPage(this.currentPage - 1);
    if (prod.length){
      this.products = prod;
      this.currentPage -= 1;
    }
  }

  addToCart(product: Products): void {
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product: Products): void {
    this.cartService.deleteFromCart(product);
  }

}
