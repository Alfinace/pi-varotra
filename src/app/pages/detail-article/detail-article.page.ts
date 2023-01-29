import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Cart } from 'src/app/models/cart.model';
import { ArticleService } from 'src/app/services/article.service';
import { CartService } from 'src/app/services/cart.service';
import { SessionService } from 'src/app/services/session.service';
import { CartComponent } from 'src/app/shared/components/modals/cart/cart.component';
import { UtilsService } from 'src/app/utils/utils.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.page.html',
  styleUrls: ['./detail-article.page.scss'],
})
export class DetailArticlePage implements OnInit {
  @ViewChild('btnAddCart') btnAddCart: ElementRef;
  @Input() public article: Article;
  public rate = 0;
  public articles: Article[] = []; currentUser: any;
  public rateForm: FormGroup;
  public commented: boolean = false;
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
  isOpen: boolean = false;
  rates: any[] = [];
  constructor(
    private articleService: ArticleService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private modalController: ModalController,
    private cartService: CartService,
  ) {
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

  onSubmit() {

    this.articleService.rateArticle({ ...this.rateForm.value, rate: this.rate, articleId: this.article.id }).subscribe((res: any) => {
      this.article = res
      this.rateForm.reset()
      this.isOpen = false;
      this.rates.push({ ...res, ...this.rateForm.value, rate: this.rate, user: { ...this.currentUser } })
    })
  }

  onOpenModal() {
    if (this.currentUser) {
      this.isOpen = !this.isOpen;
    }
  }

  public setRate(rate: number) {
    this.rate = rate;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleService.getArticleBySlug(params.slug).subscribe((res: any) => {
        this.article = res
        this.rateForm = this.fb.group({
          comment: ['', Validators.required]
        })
        this.sessionService.getInfoUser().toPromise().then((res: any) => {
          this.currentUser = res
        })
        this.cartService.getAllCart()
        this.articleService.getArticles(0, 10).subscribe((res: any) => {
          this.articles = res.rows
        })

        this.articleService.getRateArticle(this.article.id).subscribe((res: any) => {
          this.rates = res
          this.commented = this.rates.filter(r => r.userId == this.currentUser.id).length > 0
        })
      })
    })

  }

  slideOpts = {
    slidesPerView: 1,
  };

  public close() {
    this.utilsService.goBack();
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
    if (this.currentUser && this.currentUser.id == this.article.store.userId) {
      return false
    }
    if (this.carts.length > 0) {
      let i = this.carts.findIndex(c => c.articleId == this.article.id);
      return i > -1
    }
    return false
  }

  addCart(articleId: number) {
    this.cartService.addCart({
      articleId: articleId, quantity: 1,
    })
  }

  public show(article: any) {
    // this.modalController.create({
    //   component: ArticleDetailComponent,
    //   componentProps: { article }
    // }).then((modal) => {
    //   modal.present();
    // });
  }
  async onCart() {
    let modal = await this.modalController.create({
      component: CartComponent,
      animated: true,
    })

    await modal.present();

  }
}
