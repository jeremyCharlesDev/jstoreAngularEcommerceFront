import { Products } from './../model/products';
import { ProductsService } from './../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  products: Products[];
  productSub: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request) => {
        // console.log(request.id);
        this.productSub = this.productService.prodSubject.subscribe(
          (data: Products[]) => {
            const prod = data.filter(product => product.Category === request.id);
            this.products = prod;
          }
        );
        this.productService.emitProducts();
      }
    );
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
