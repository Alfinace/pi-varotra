import { NewService } from './../../services/new.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { New } from 'src/app/models/new.model';
import SwiperCore, { SwiperOptions, Autoplay, Keyboard } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ArticleService } from 'src/app/services/article.service';
import { StoreService } from 'src/app/services/store.service';
import { PubService } from 'src/app/services/pub.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartComponent } from 'src/app/shared/components/modals/cart/cart.component';
SwiperCore.use([Autoplay, Keyboard]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  public _news: any[] = [];
  public loadedPub = false;
  public loadedNew = false;
  loadedArticle: boolean = false;
  loadedStore: boolean = false;
  public pubs = []
  public loadedCategorie = false;
  public config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: false,
    pagination: { clickable: true },
    autoplay: {
      delay: 4000,
    },
    cardsEffect: {
      slideShadows: true
    },
    speed: 1000,
    lazy: true,
    loop: true,
    scrollbar: { draggable: true },
  };

  public configP: SwiperOptions = {
    slidesPerView: 2.1,
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    speed: 1000,
    scrollbar: { draggable: true },
  };

  public catConfig: SwiperOptions = { ...this.config, slidesPerView: 3, spaceBetween: 10, loop: false };


  public articles: Article[] = []
  public articlesPlusVendu: Article[] = []
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;
  categories: any;
  stores: any[];

  constructor(
    private categoryService: CategorieService,
    private articleService: ArticleService,
    private newService: NewService,
    private router: Router,
    private pubService: PubService,
    private storeService: StoreService
  ) { }
  ngOnInit() {
  }
  public doRefresh(event: any) {
    this.fetchData(event)
  }

  goToArticles(id: number) {
    this.router.navigate(
      ['/search'],
      { queryParams: { categoryId: id } }
    );
  }


  onSwiper(swiper: any) {
  }
  public onSlideChange() {

  }

  ngAfterViewInit() {
    this.swiperComponent.swiperRef.autoplay.running = true;
    this.fetchData()

  }

  fetchData(e?: any) {
    this.pubService.getPubs(0, 10).toPromise().then((res: any) => {
      this.pubs = res.rows;
      this.loadedPub = true;
      this.categoryService.getCategories().toPromise().then((res: any) => {
        this.categories = res.rows;
        this.loadedCategorie = true;
        this.articleService.getArticles(0, 10).toPromise().then((res: any) => {
          this.articles = res.rows;
          this.loadedArticle = true;
          this.articleService.getArticlesPlusVendu(0, 10).toPromise().then((res: any) => {
            this.articlesPlusVendu = res.rows;
          })
          this.storeService.getStores(0, 10).toPromise().then((res: any) => {
            this.stores = res.rows as any[];
            this.loadedStore = true;
            this.newService.getNews(0, 5).toPromise().then((res: any) => {
              this._news = res.rows;
              this.loadedNew = true;
              if (e) {
                e.target.complete();
              }
            });
          })
        });
      });
    })




  }
}
