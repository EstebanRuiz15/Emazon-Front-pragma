import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { URL_CREATE_CATEGORI } from 'src/app/shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryComponent {
  private apiUrl = URL_CREATE_CATEGORI; 

  constructor(private http: HttpClient) { }

  createCategory(name: string, description: string): Observable<any> {
    const body = { name, description };
    return this.http.post(this.apiUrl, body).pipe(
      timeout(1000));
  }
  
}