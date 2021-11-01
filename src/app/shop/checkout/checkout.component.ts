import { UsersService } from './../../services/users.service';
import { OrdersService } from './../../services/orders.service';
import { Cart } from './../../model/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[];
  cartData;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private userService: UsersService
    ) {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  // createOrders(){
  //   const user = this.userService.user;
  //   const cart = this.cartService.cart;
  //   this.orderService.createOrders(user, cart)
  //   .then(() => {
  //     console.log('commande créé avec succès !');
  //   })
  //   .catch(
  //     (error) => {
  //       console.log('error: ' + error);
  //     }
  //   );
  // }

}
