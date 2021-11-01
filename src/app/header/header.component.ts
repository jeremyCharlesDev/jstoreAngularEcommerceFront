import { UsersService } from './../services/users.service';
import { CategoryService } from './../services/category.service';
import { Products } from './../model/products';
import { Cart } from './../model/cart';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;
  categories: Category[];
  categorySub: Subscription;
  isAuth = false;

  constructor(private cartService: CartService, private categoryService: CategoryService, private userService: UsersService) { }

  ngOnInit(): void {
    this.isAuth = this.userService.isAuth;
    console.log(this.isAuth);

    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
    this.categorySub = this.categoryService.categorySubjet.subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
    this.categoryService.emitCategories();
  }

  logout(): void {
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }
}
