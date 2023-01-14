import { Cart } from './../models/cart.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartState$: BehaviorSubject<any> = new BehaviorSubject<any>([])
  public cartStateObservable = this.cartState$.asObservable()
  constructor(private localstorageService: LocalstorageService) { }

  public addCart(cart: Cart) {
    let carts = this.localstorageService.getItem('cart') as Array<Cart>;
    if (!carts) {
      carts = [];
    }
    let i = carts.findIndex(c => c.articleId == cart.articleId);
    if (i > -1) {
      return
    }
    carts.push({ ...cart })
    this.localstorageService.setItem('cart', carts);
    this.cartState$.next(carts)
  }

  public updateQuantity(articleId: number, quantity: number) {
    let carts = this.localstorageService.getItem('cart') as Array<Cart>;
    let i = carts.findIndex(c => c.articleId == articleId);
    if (i > -1) {
      carts[i] = { ...carts[i], quantity };
      this.localstorageService.setItem('cart', carts);
      this.cartState$.next(carts)
    }
  }

  public getAllCart() {
    let carts = this.localstorageService.getItem('cart') as Array<Cart>;
    this.cartState$.next(carts)
  }

  getAllCartData() {
    return this.localstorageService.getItem('cart') as Array<Cart>;
  }

  public removeCart(articleId: number) {
    let carts = this.localstorageService.getItem('cart') as Array<Cart>;
    carts = carts.filter(c => c.articleId != articleId);
    this.localstorageService.setItem('cart', carts);
    this.cartState$.next(carts)
  }

  public removeAllCart() {
    this.localstorageService.removeItem('cart');
    this.cartState$.next([])
  }
}
