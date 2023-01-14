import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-detail-user-info',
  templateUrl: './detail-user-info.component.html',
  styleUrls: ['./detail-user-info.component.scss'],
})
export class DetailUserInfoComponent implements OnInit {
  cin: any[] = []
  public customer = this.config.data.customer;
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef,) { }

  ngOnInit() {
    this.customer.images.forEach((i: any) => {
      if (i.type === 'cin') {
        this.cin.push(i)
      }
    });

  }

  close() {
    this.ref.close();
  }
}
