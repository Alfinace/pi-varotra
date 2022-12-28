import { AfterViewInit, Component, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Autoplay, Keyboard } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Autoplay, Keyboard]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  config: SwiperOptions = {
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

  configP: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    pagination: { clickable: true },
    speed: 1000,
    scrollbar: { draggable: true },
  };

  catConfig: SwiperOptions = { ...this.config, slidesPerView: 4, spaceBetween: 10, loop: false };


  @ViewChild('swiperComponent') swiperComponent: SwiperComponent;

  constructor() { }

  public doRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 5000);
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngAfterViewInit() {
    console.log(this.swiperComponent.swiperRef.autoplay);

    this.swiperComponent.swiperRef.autoplay.running = true;
  }
}
