import { Products } from './../../model/products';
import { environment } from './../../../environments/environment';
import { Cart } from './../../model/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];
  prefUrlImage = environment.api_image;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

  addProduct(product: Products): void {
    this.cartService.addProductToCart(product);
  }

  deleteProduct(product: Products): void {
    this.cartService.deleteFromCart(product);
  }

}
