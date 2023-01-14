import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ModalController } from '@ionic/angular';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public paniers: any[] = []
  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private articleService: ArticleService) { }

  async ngOnInit() {
    var carts = this.cartService.getAllCartData()
    this.mappingData(carts)
  }


  close() {
    this.modalController.dismiss()
  }

  public updateQuantity(cart: any, quantity: number, fIndex: number, SIndex: number) {
    if (quantity > 0 && quantity <= cart.stock) {
      this.cartService.updateQuantity(cart.articleId, quantity)
      this.paniers[fIndex][SIndex].quantity = quantity
    }
  }

  async mappingData(carts: Cart[],) {
    var panierObject = {}
    var promiseArray: any[] = []
    for (let i = 0; i < carts.length; i++) {
      let cart = carts[i];
      let promise = new Promise((resolve, reject) => {
        this.articleService.getArticle(cart.articleId).toPromise().then(c => {
          if (c) {
            cart = { ...cart, ...c }
            resolve(cart)
          } else {
            resolve(null)
          }
        }).catch(err => {
          reject(null)
        })
      })
      promiseArray.push(promise)
    }
    let data = await Promise.all(promiseArray) as Cart[]
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      let key = p.storeId?.toString()
      if (!panierObject.hasOwnProperty(`${key}`)) {
        panierObject = {
          ...panierObject,
          [key as any]: data.filter(d => d.storeId == key)
        }
      }
    }
    let pToArray = Object.entries(panierObject);
    pToArray.forEach(([key, value]) => this.paniers.push(value));
  }


  public totalCmd(cart: any[]): number {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const c = cart[i];
      total += c.quantity * c.unitPrice
    }
    return total
  }


  public removeCart(articleId: number, fIndex: number, SIndex: number) {
    console.log(articleId);

    this.cartService.removeCart(articleId)
    this.paniers[fIndex].splice(SIndex, 1)
  }


}
