import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.page.html',
  styleUrls: ['./list-store.page.scss'],
})
export class ListStorePage implements OnInit {
  stores: any;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storeService.getStores(0, 10).toPromise().then((res: any) => {
      this.stores = res.rows;
    });
  }


}
