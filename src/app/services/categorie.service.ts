import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpService) { }
  getCategories(page?: number, size?: number) {
    return this.http.get('categories?page=' + page + '&size=' + size)
  }
  updateCategorie(id: number, value: any) {
    return this.http.put('categories/' + id, value)
  }
  createCategorie(value: any) {
    return this.http.post('categories', value)
  }

  getAllCity() {
    return this.http.get('cities')
  }
}
