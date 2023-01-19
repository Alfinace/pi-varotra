import { NewService } from './../../services/new.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { New } from 'src/app/models/new.model';
import SwiperCore, { SwiperOptions, Autoplay, Keyboard } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ArticleService } from 'src/app/services/article.service';
import { StoreService } from 'src/app/services/store.service';
SwiperCore.use([Autoplay, Keyboard]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  public loaded = false;
  public _news: any[] = [];
  public loadedPub = false;
  public pub = []
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
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    speed: 1000,
    scrollbar: { draggable: true },
  };

  public catConfig: SwiperOptions = { ...this.config, slidesPerView: 4, spaceBetween: 10, loop: false };


  public articles: Article[] = []
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;
  categories: any;
  stores: any[];

  constructor(
    private categoryService: CategorieService,
    private articleService: ArticleService,
    private newService: NewService,
    private storeService: StoreService
  ) { }
  async ngOnInit(): Promise<void> {
    this.categories = (await this.categoryService.getCategories().toPromise()).rows;
    this.loadedCategorie = true;
    this.articleService.getArticles(0, 10).subscribe((res: any) => {
      this.articles = res.rows;
      this.loaded = true;
    });

    this.storeService.getStores(0, 10).subscribe((res: any) => {
      this.stores = res.rows as any[];
    })

    this.newService.getNews(0, 5).subscribe((res: any) => {
      this._news = res.rows;
    }
    );
  }

  public doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 5000);
  }

  onSwiper(swiper: any) {
  }
  public onSlideChange() {

  }

  ngAfterViewInit() {
    this.swiperComponent.swiperRef.autoplay.running = true;
  }
}
