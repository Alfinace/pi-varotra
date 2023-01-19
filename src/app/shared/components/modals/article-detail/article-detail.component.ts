import { Article } from 'src/app/models/article.model';
import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild('btnAddCart') btnAddCart: ElementRef;
  @Input() public article: Article;
  public articles: Article[] = [];;
  public carts: Cart[] = [];
  private unsubscribe$: Subject<any> = new Subject<any>()
  public configP: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    speed: 1000,
    scrollbar: { draggable: true },
  };
  constructor(
    private router: Router,
    private cartService: CartService,
    private modalController: ModalController) {
    this.cartService.cartStateObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((carts: Cart[]) => {
      this.carts = carts
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }


  ngOnInit() {
    this.cartService.getAllCart()
  }

  slideOpts = {
    slidesPerView: 1,
  };

  public close() {
    this.modalController.dismiss();
  }

  public logScrollStart() {

  }
  public logScrolling(event: any) {
    if (this.btnAddCart) {
      if (event.detail.scrollTop > 100) {
        this.btnAddCart.nativeElement.setAttribute('class', 'fixed-row btn-row mt');
      } else {
        this.btnAddCart.nativeElement.setAttribute('class', 'btn-row mt');
      }
      this.btnAddCart.nativeElement.style.opacity = (event.detail.scrollTop / 500).toString();
    }
  }

  public logScrollEnd() {

  }

  checkedArticleAddedToCart() {
    if (this.carts.length > 0) {
      let i = this.carts.findIndex(c => c.articleId == this.article.id);
      return i > -1
    }
    return false
  }

  onAddCart(articleId: number) {
    this.cartService.addCart({
      articleId: articleId, quantity: 1,
    })
  }
}
