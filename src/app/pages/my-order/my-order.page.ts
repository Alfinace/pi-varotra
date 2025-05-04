import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { OrderDetailComponent } from '../space-store/order/order-detail/order-detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage {

  myOrders: any = []
  page: number = 0
  size: number = 10

  constructor(
    private articleService: ArticleService,
    private modal : ModalController
  ) { }

  ionViewWillEnter() {
    this.articleService.geMyOrders(this.page, this.size).subscribe(res => {
      this.myOrders = res.rows

    })
  }

  async showOrder(order: any) {
    const modal = await this.modal.create({
      component: OrderDetailComponent,
      componentProps: { order }
    });

    await modal.present();

  }
}
