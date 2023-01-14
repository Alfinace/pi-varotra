import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpService) { }

  getStores(page: number, size: number) {
    return this.http.get('stores?page=' + page + '&size=' + size)
  }

}
