import { Products } from './../model/products';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[];
  cartData = {len: 0, cost: 0};

  constructor() {
    this.initCart();
  }

  initCart(): void {
    if (typeof(localStorage) !== 'undefined') {
      // JSON.parse permet de transformer la chaine de caractère en chaine objet
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartData = JSON.parse(localStorage.getItem('cartData'));
      this.cart = cart ? cart : [];
      this.cartData = cartData ? cartData : {len: 0, cost: 0};
    } else {
      this.cart = [];
      this.cartData = {len: 0, cost: 0};
    }
  }

  addProductToCart(newProduct: Products): void {
    const checkedProduct = this.cart.find(x => x.product === newProduct);
    if (checkedProduct) {
      checkedProduct.number++;
    } else {
      const newProductToAdd = {
        number: 1,
        product: newProduct,
      };
      this.cart.push(newProductToAdd);
    }
    this.updateDataCart();
  }

  updateDataCart(): void {
    let len = 0;
    let cost = 0;
    this.cart.forEach(element => {
      len += element.number;
      cost += element.product.price * element.number;
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
    if (typeof(localStorage) !== 'undefined') {
      // JSON.stringigy permet de transformer le tableau en chaine de caractère
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  }

  deleteFromCart(productToDelete: Products): void {
    const indexProduct = this.cart.findIndex(x => x.product === productToDelete);

    // findIndex renvoi -1 s'il ne trouve rien
    if (indexProduct !== -1) {
      // Si le produit est plusieur fois dans le panier on décrémente
      if (this.cart[indexProduct].number > 1) {
        this.cart[indexProduct].number--;
      // Si il y a qu'un seul produit on le supprime
      } else {
        this.cart.splice(indexProduct, 1);
      }
    }
    this.updateDataCart();
  }

  removeElementOfCart(index: number): void {
    this.cart.splice(index, 1);
    this.updateDataCart();
  }
}
