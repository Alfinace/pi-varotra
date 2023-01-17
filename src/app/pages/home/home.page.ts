import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { New } from 'src/app/models/new.model';
import SwiperCore, { SwiperOptions, Autoplay, Keyboard } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Autoplay, Keyboard]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  public loaded = false;
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
  public news: New[] = [
    {
      id: 74,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 14,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 21,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 13,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },

  ]

  public articles: Article[] = []
  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;

  constructor() { }

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
