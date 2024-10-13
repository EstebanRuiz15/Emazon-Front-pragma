import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { URL_CREATE_CATEGORI, URL_GET_CATEGORIES } from 'src/app/shared/Constants';
import { PageResponse } from 'src/app/components/interfaces/table.interface';
import { Category } from 'src/app/components/interfaces/category';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ServiceCategoryComponent {
  private apiUrl = URL_CREATE_CATEGORI;
  private apiUrlList = URL_GET_CATEGORIES;

  constructor(private http: HttpClient) { }

  createCategory(name: string, description: string): Observable<any> {
    const body = { name, description };
    return this.http.post(this.apiUrl, body).pipe(
      timeout(2000));
  }

  getCategories(
    page: number = 0,
    size: number = 10,
    order: string = ''
  ): Observable<PageResponse<Category>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orden', order);

    return this.http.get<any>(`${this.apiUrlList}`, { params })
      .pipe(
        map(response => ({
          content: response.category,
          totalElements: response.totalData,
          totalPages: response.totalPages,
          size: response.size,
          number: response.currentPage
        }))
      ).pipe(timeout(500));
  }

}