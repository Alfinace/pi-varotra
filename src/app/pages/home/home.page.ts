import { Component } from '@angular/core';
import SwiperCore, { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  public doRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 5000);
  }

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    scrollbar: { draggable: true },
  };

  catConfig: SwiperOptions = { ...this.config, slidesPerView: 4, spaceBetween: 10 };

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
