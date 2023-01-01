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

  public articles: Article[] = [
    {
      id: 8,
      designation: 'Article 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
      images: [
        'https://cdn.pixabay.com/photo/2021/06/04/06/09/cherries-6308871_960_720.jpg',
      ],
      unitPrice: 100,
      stock: 10,
      rate: 4.5,
      reviews: 10,
      category: { id: 1, designation: 'Cat 1' },
      updatedAt: '2021-06-01',
    },
    {
      id: 2,
      designation: 'Article 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
      images: [
        'https://cdn.pixabay.com/photo/2018/05/29/23/18/potato-3440360__340.jpg',
      ],
      unitPrice: 100,
      stock: 10,
      rate: 4.5,
      reviews: 10,
      category: { id: 1, designation: 'Cat 1' },
      updatedAt: '2021-06-01',
    },
    {
      id: 3,
      designation: 'Article 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
      images: [
        'https://cdn.pixabay.com/photo/2021/06/04/06/09/cherries-6308871_960_720.jpg',
      ],
      unitPrice: 100,
      stock: 10,
      rate: 4.5,
      reviews: 10,
      category: { id: 1, designation: 'Cat 1' },
      updatedAt: '2021-06-01',
    },
    {
      id: 4,
      designation: 'Article 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
      images: [
        'https://cdn.pixabay.com/photo/2021/06/04/06/09/cherries-6308871_960_720.jpg',
      ],
      unitPrice: 100,
      stock: 10,
      rate: 4.5,
      reviews: 10,
      category: { id: 1, designation: 'Cat 1' },
      updatedAt: '2021-06-01',
    },
    {
      id: 5,
      designation: 'Article 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
      images: [
        'https://cdn.pixabay.com/photo/2021/06/04/06/09/cherries-6308871_960_720.jpg',
      ],
      unitPrice: 100,
      stock: 10,
      rate: 4.5,
      reviews: 10,
      category: { id: 1, designation: 'Cat 1' },
      updatedAt: '2021-06-01',
    },

  ]
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
