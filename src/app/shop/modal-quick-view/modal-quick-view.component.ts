import { CartService } from './../../services/cart.service';
import { environment } from './../../../environments/environment';
import { Products } from './../../model/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input() products: Products[];
  prefUrlImage = environment.api_image;


  constructor(private CartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Products): void {
    this.CartService.addProductToCart(product);
  }


}
