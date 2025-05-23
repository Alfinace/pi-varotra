import { BehaviorSubject } from 'rxjs';
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

  getStoreOne(id: number) {
    return this.http.get('stores/' + id)
  }

  getArticlesByStore(id: number, page: number, size: number) {
    return this.http.get('articles/store/' + id + '?page=' + page + '&size=' + size)
  }

  getLocalizationStores() {
    return this.http.get('stores/localization')
  }

  updateLocalizationStores(data:{ lat: number, long: number }) {
    return this.http.put('stores/localization', {...data})
  }
}
