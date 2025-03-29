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
  public keyWord = '';
  public applyFilter: Filter = {
    "categories": [],
    "order": "DESC",
    "orderBy": "updatedAt",
    "range": {
      "lower": 0,
      "upper": 10000
    },
    "villes": [
      "Tous"
    ],
    keyWord: ''
  };
  unsubscribe = new Subject()
  articles: any;
  totalCount = 0;
  page = 0;
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
        this.categoryId = parseInt(params.categoryId)
        this.articleService.getArticles(0, 8, this.categoryId).toPromise().then(res => {
          this.articles = res.rows
          this.totalCount = res.count
          this.applyFilter.categories = [this.categoryId as number]
          this.loading = false;
        })
      } else {
        this.articleService.getArticles(0, 8).toPromise().then(res => {
          this.articles = res.rows
          this.totalCount = res.count,
          this.applyFilter.categories = [];
          this.categoryId = null;
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
    const modal = await this.modalController.create({
      component: FilterSortingComponent,
      componentProps: { filter: this.applyFilter },
      id: 'filter-modal',
      cssClass: 'filter-modal',
      backdropDismiss: false,
      animated: true,
      mode: 'md'

    });

    await modal.present();

    const data = await modal.onDidDismiss();
    if (data.data) {
      this.page = 0;
      this.loading = true;
      this.applyFilter = data.data
      this.articleService.getAndFitlerArticles(this.applyFilter, this.page, 10).subscribe((res: any) => {
        this.articles = res.rows;
        this.totalCount = res.count;
        this.loading = false;

      })
    }
  }

  loadData(event: any) {
    this.page++;
    this.articleService.getAndFitlerArticles(this.applyFilter, this.page, this.pageSize).toPromise().then(res => {
      this.articles.push(...res.rows)
      event.target.complete();
      if (this.articles.length === res.count) {
        event.target.disabled = true;
      }
    })
  }

  search() {
    this.page = 0;
    this.loading = true;
    this.applyFilter.keyWord = this.keyWord
    this.articleService.getAndFitlerArticles(this.applyFilter, this.page, 10).subscribe((res: any) => {
      this.articles = res.rows;
      this.totalCount = res.count;
      this.loading = false;
    })
  }
}
