import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  public articles: Article[] = [
    {
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
      id: 1,
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
  constructor() { }

  ngOnInit() {
  }


}
