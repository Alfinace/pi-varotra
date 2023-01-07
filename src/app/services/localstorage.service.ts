import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private readonly prefix = environment.prefix;
  constructor() { }

  public setItem(key: string, value: any) {
    localStorage
      .setItem
      (`${this.prefix}${key}`, JSON.stringify(value));
  }

  public getItem(key: string) {
    let item = localStorage.getItem(`${this.prefix}${key}`)
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return '';
  }

  public removeItem(key: string) {
    localStorage.removeItem(`${this.prefix}${key}`)
  }

}
