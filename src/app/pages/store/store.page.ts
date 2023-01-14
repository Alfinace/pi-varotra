import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public stores = [];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storeService.getStores(0, 10).toPromise().then(res => {
      this.stores = res.rows
    }).catch(err => {
      console.log(err);

    })
  }

}
