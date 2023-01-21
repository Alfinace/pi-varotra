import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.page.html',
  styleUrls: ['./list-store.page.scss'],
})
export class ListStorePage implements OnInit {
  stores: any;
  loading = true;
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true;
    this.storeService.getStores(0, 10).toPromise().then((res: any) => {
      this.stores = res.rows;
      this.loading = false;
    });
  }


}
