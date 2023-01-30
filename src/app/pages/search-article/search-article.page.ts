import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
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
  unsubscribe = new Subject()
  articles: any;
  totalCount = 0;
  page = 1;
  pageSize = 8
  categoryId: any;
  loading: boolean;
  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private articleService: ArticleService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ionViewWillEnter() {
    this.loading = true;
    this.route.queryParams.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((params) => {
      if (params.categoryId) {
        this.categoryId = params.categoryId
        this.articleService.getArticles(0, 8, this.categoryId).toPromise().then(res => {
          this.articles = res.rows
          this.totalCount = res.count
          console.log(this.totalCount);
          this.loading = false;
        })
      } else {
        this.articleService.getArticles(0, 8).toPromise().then(res => {
          this.articles = res.rows
          this.totalCount = res.count,
            console.log(this.totalCount);
          this.loading = false;
        })
      }
    }
    );
  }

  ionViewWillLeave() {
    this.unsubscribe.next(null)
    this.unsubscribe.complete()
  }


  async openFilter() {
    console.log(this.applyFilter);

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
