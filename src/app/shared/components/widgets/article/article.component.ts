import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router,
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
    this.router.navigate(['/detail-article', this.article.slug]);
    // this.modalController.create({
    //   component: ArticleDetailComponent,
    //   componentProps: { article: this.article }
    // }).then((modal) => {
    //   modal.present();
    // });
  }

  public addPanier(articleId: any) {
    this.cartService.addCart({ articleId, quantity: 1 })
  }

  checkedArticleAddedToCart() {
    let i = this.carts.findIndex(c => c.articleId == this.article.id);
    return i > -1
  }
}
