import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(private http: HttpService) { }

  getNews(page: number, size: number) {
    return this.http.get(`news?page=${page}&size=${size}`);
  }

  addNew(newData: any) {
    return this.http.post(`news`, newData);
  }

  getNew(id: number) {
    return this.http.get(`news/${id}`);
  }

  updateNew(id: number, newData: any) {
    return this.http.put(`news/${id}`, newData);
  }

  deleteNew(id: number) {
    return this.http.delete(`news/${id}`);
  }

}
