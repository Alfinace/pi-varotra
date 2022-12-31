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
    return JSON.parse(localStorage.getItem(`${this.prefix}${key}`) ?? '');
  }

  public removeItem(key: string) {
    localStorage.removeItem(`${this.prefix}${key}`)
  }

}
