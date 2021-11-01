import { CartService } from './../../services/cart.service';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../model/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Products;
  prefUrlImage = environment.api_image;
  productSub: Subscription;

  constructor(private route: ActivatedRoute, private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const id = this.route.snapshot.paramMap.get('id');
    // const id = +this.route.snapshot.params['id'];
    this.productSub = this.prodService.prodSubject.subscribe(
      (data: Products[]) => {
          this.product = this.prodService.getProductById(+id);
      }
    );
    this.prodService.emitProducts();
  }

  addToCart(product: Products): void {
    this.cartService.addProductToCart(product);
  }


}
