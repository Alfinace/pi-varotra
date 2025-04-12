import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ArticleDetailComponent } from '../../modals/article-detail/article-detail.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations:[
    trigger('flyToCart', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translate(50px, -200px)' }),
        animate('2s ease-in-out',
          style({ top: '0', right: '0', opacity: 0.5, position: 'fixed', transform: 'scale(0.1) rotate(180deg)' })
        ),
      ]),
    ]),
  ]
})
export class ArticleComponent implements OnInit {
  @Input() public article: Article;
  public carts: Cart[] = [];
  public tmpShow = false
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
  }

  public addCart(articleId: any, event: any) {
    this.tmpShow = true
    this.cartService.addCart({ articleId, quantity: 1 }, event);
    setTimeout(() => {
      this.tmpShow = false
    }, 1500);

  }

  checkedArticleAddedToCart() {
    let i = this.carts.findIndex(c => c.articleId == this.article?.id);
    return i > -1
  }
}
