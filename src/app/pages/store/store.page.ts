import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Store } from 'src/app/models/store-model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public stores: Store[] = [];
  public page: number = 0;
  public pageSize: number = 5;
  count: any;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storeService.getStores(this.page, this.pageSize).toPromise().then(res => {
      this.stores = res.rows
      this.count = res.count;
    }).catch(err => {
      console.log(err);

    })
  }

  loadData(event: any) {
    if (this.stores.length === this.count) {
      event.target.disabled = true;
      return;
    }
    this.page++;
    this.storeService.getStores(this.page, this.pageSize).toPromise().then(res => {
      this.stores.push(...res.rows);
      this.count = res.count;
      event.target.complete();
      if (this.stores.length === res.count) {
        event.target.disabled = true;
      }
    }).catch(err => {
      console.log(err);

    })
  }

}
