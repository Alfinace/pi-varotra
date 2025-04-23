
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  public articles: Article[] = []
  public store: any
  isModalOpen: boolean = false;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() { }
  ngOnDestroy() {
    this.isModalOpen = false
  }

  ionViewWillEnter() {
    let id = this.route.snapshot.paramMap.get('id') as any;
    this.storeService.getStoreOne(id).toPromise().then(res => {
      this.store = res
    })
    this.storeService.getArticlesByStore(id, 0, 10).toPromise().then(res => {
      this.articles = res.rows
    })
  }

  toggle() {
    this.isModalOpen = !this.isModalOpen
  }
}
