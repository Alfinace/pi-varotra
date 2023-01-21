import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PubService {

  constructor(
    private http: HttpService
  ) { }


  createPub(value: any) {
    return this.http.post(`pubs`, value);
  }
  getPubs(page: number, rows: number) {
    return this.http.get(`pubs?page=${page}&size=${rows}`);
  }
  updatePub(id: number, value: any) {
    return this.http.put(`pubs/${id}`, value);
  }

  deletePub(id: number) {
    return this.http.delete(`pubs/${id}`);
  }

}
