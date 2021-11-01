import { Products } from './../model/products';
import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products[] = [];
  prodSubject = new Subject<Products[]>();

  numberOfProductByPage = 6;


  constructor(private http: HttpClient) {
    this.getProductsFromServer();
  }

  emitProducts(): void {
    this.prodSubject.next(this.products);
  }

  getProductsFromServer(): void {
    const url = `${environment.API + 'products?' + environment.API_KEY}`;
    this.http.get(url).subscribe(
      (dataProducts: Result) => {
        if (dataProducts.status === 200){
          this.products = dataProducts.result;
          this.emitProducts();
        } else {
          console.log('Error : ' + dataProducts.message);
        }
      }
    );
  }

  getProductById(id: number): Products {
    const product = this.products.find(p => p.idProduct == id);
    if (product) {
      return product;
    }
    return null;
  }

  getProductByPage(page: number): Products[] {
    // calcul nombre de page maximum
    const nbOfPage = this.products.length / this.numberOfProductByPage;
    if (page > 0 || page < nbOfPage ) {
      const prodResult = this.products.slice(page * this.numberOfProductByPage, (page + 1) * this.numberOfProductByPage);
      return prodResult;
    }
    return null;
  }

}
