import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() order: any;
  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    console.log(this.order);

  }

  close() {
    this.modal.dismiss();
  }
}
