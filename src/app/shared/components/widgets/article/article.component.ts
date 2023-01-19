import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ArticleDetailComponent } from '../../modals/article-detail/article-detail.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() public article: Article;
  public carts: Cart[] = [];
  constructor(
    private modalController: ModalController,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartStateObservable.subscribe((carts: Cart[]) => {
      if (carts) {
        this.carts = carts
      } else {
        this.carts = []
      }
    })
  }

  public show() {
    this.modalController.create({
      component: ArticleDetailComponent,
      componentProps: { article: this.article }
    }).then((modal) => {
      modal.present();
    });
  }

  public addPanier(articleId: any) {
    this.cartService.addCart({ articleId, quantity: 1 })
  }

  checkedArticleAddedToCart() {
    let i = this.carts.findIndex(c => c.articleId == this.article.id);
    return i > -1
  }
}
