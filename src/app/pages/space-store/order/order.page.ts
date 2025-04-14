import { Component, OnInit } from '@angular/core';

import { ArticleService } from 'src/app/services/article.service';
import { ModalController } from '@ionic/angular';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders: any[] = [];
  totalRecords = 0;
  page = 0;
  pageSize = 7;


  constructor(
    private articleService: ArticleService,
    private modal: ModalController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.articleService.getCmd(this.page, this.pageSize).pipe(take(1)).subscribe((res: any) => {
      this.orders = res.rows;
      this.totalRecords = res.count;
    })
  }


  paginate(e: any) {
    this.page = e.page;
    this.loadData();
  }

  async showOrder(order: any) {
    const modal = await this.modal.create({
      component: OrderDetailComponent,
      componentProps: { order }
    });

    await modal.present();

  }
}
