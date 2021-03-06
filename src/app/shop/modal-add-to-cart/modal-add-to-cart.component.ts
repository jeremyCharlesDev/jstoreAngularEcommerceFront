import { environment } from './../../../environments/environment';
import { Products } from './../../model/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.css']
})
export class ModalAddToCartComponent implements OnInit {

  @Input() products: Products[];
  prefUrlImage = environment.api_image;

  constructor() { }

  ngOnInit(): void {

  }

}
