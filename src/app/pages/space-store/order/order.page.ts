import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders: any[] = [];
  totalRecords = 0;
  page = 0;
  pageSize = 10;


  constructor(
    private articleService: ArticleService,
    private modal: ModalController) { }

  ngOnInit() {
    this.articleService.getCmd(0, 10).toPromise().then(res => {
      this.orders = res.rows;
      this.totalRecords = res.count;
    })
  }

  paginate(e: any) {
    console.log(e);
  }

  async showOrder(order: any) {
    const modal = await this.modal.create({
      component: OrderDetailComponent,
      componentProps: { order }
    });

    await modal.present();

  }
}
