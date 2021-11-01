import { environment } from './../../../environments/environment';
import { CartService } from './../../services/cart.service';
import { UsersService } from './../../services/users.service';
import { OrdersService } from './../../services/orders.service';
import { Component, Input, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-paypal',
  templateUrl: './button-paypal.component.html',
  styleUrls: ['./button-paypal.component.css']
})
export class ButtonPaypalComponent implements OnInit {

  @Input() price;
  payPalConfig: IPayPalConfig;
  currency = environment.CURRENCY;
  clientId = environment.ID_CLIENT_PAYPAL;

  constructor(private orderService: OrdersService,
              private userService: UsersService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.initConfig();
  }

  initConfig(): void {
    const price = this.price;
    const currency = this.currency;
    const clientId = this.clientId;

    this.payPalConfig = {
      // tslint:disable-next-line: object-literal-shorthand
      currency: currency,
      // tslint:disable-next-line: object-literal-shorthand
      clientId: clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: currency,
                  value: price,
                  breakdown: {
                      item_total: {
                          currency_code: currency,
                          value: price
                      },
                  }
              },
              items: [{
                  name: 'PAIEMENT JSTORE SHOP',
                  quantity: '1',
                  category: 'PHYSICAL_GOODS',
                  unit_amount: {
                      currency_code: currency,
                      value: price,
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          const user = this.userService.user;
          const cart = this.cartService.cart;
          this.orderService.createOrders(user, cart)
          .then(() => {
            console.log('commande créé avec succès !');
          })
          .catch(
            (error) => {
              console.log('error: ' + error);
            }
          );
          actions.order.get().then(details => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
      },
      onError: err => {
          console.log('OnError', err);
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      },
  };
  }

}
