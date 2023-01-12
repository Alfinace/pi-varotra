import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from 'src/app/models/article.model';
import { Filter } from 'src/app/models/filter.type';
import { ArticleService } from 'src/app/services/article.service';
import { FilterSortingComponent } from 'src/app/shared/components/modals/filter-sorting/filter-sorting.component';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.page.html',
  styleUrls: ['./search-article.page.scss'],
})
export class SearchArticlePage implements OnInit {
  public applyFilter: Filter;
  constructor(
    private modalController: ModalController,
    private articleService: ArticleService) { }

  ngOnInit() {
  }

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

  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterSortingComponent,
      componentProps: { filter: this.applyFilter },
      // initialBreakpoint: 0.75,
      // breakpoints: [0, 0.75, 0.5, 0.75],
      cssClass: 'filter-modal',
      backdropDismiss: false,
      animated: true,

    });

    await modal.present();

    const data = await modal.onDidDismiss();
    if (data.data) {
      this.applyFilter = data.data
      this.articleService.getAndFitlerArticles(this.applyFilter).subscribe((res: any) => {
        this.articles = res;
      })
    }
  }
}
