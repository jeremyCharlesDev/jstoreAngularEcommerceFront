import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { Category } from './../model/category';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];
  categorySubjet = new Subject<Category[]>();

  constructor(private http: HttpClient) {
    this.getCategoryFromServer();
  }

  emitCategories(): void {
    this.categorySubjet.next(this.categories);
  }

  getCategoryFromServer(): void {
    const url = environment.API + 'category?' + environment.API_KEY;
    this.http.get(url).subscribe(
      (response: Result) => {
        if (response.status === 200) {
          this.categories = response.result;
          this.emitCategories();
        } else {
          console.log(response.message);
        }
      }
    );
  }
}
