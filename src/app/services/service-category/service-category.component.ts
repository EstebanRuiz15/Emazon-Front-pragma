import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryComponent {
  private apiUrl = 'http://localhost:7070/category/add'; 

  constructor(private http: HttpClient) { }

  createCategory(name: string, description: string): Observable<any> {
    const body = { name, description };
    return this.http.post(this.apiUrl, body);
  }
}