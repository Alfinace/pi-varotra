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
  articles: any;
  constructor(
    private modalController: ModalController,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles(0, 8).toPromise().then(res => {
      this.articles = res.rows
    })
  }


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
