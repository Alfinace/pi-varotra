import { AddArticleComponent } from './../../shared/components/add-article/add-article.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-space-store',
  templateUrl: './space-store.page.html',
  styleUrls: ['./space-store.page.scss'],
})
export class SpaceStorePage implements OnInit {
  rows = 5;

  produits = [
    {
      id: 1,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 2,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 3,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 4,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    // {
    //   id: 5,
    //   designation: 'produit',
    //   unitPrice: 0.1111,
    //   stock: 100,
    //   status: true,
    // },
    // {
    //   id: 7,
    //   designation: 'produit',
    //   unitPrice: 0.1111,
    //   stock: 100,
    //   status: true,
    // },
    // {
    //   id: 7,
    //   designation: 'produit',
    //   unitPrice: 0.1111,
    //   stock: 100,
    //   status: true,
    // },
    {
      id: 7,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 7,
      designation: 'produit 74 malgaga',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 7,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    },
    {
      id: 7,
      designation: 'produit',
      unitPrice: 0.1111,
      stock: 100,
      status: true,
    }
  ]
  totalRecords = this.produits.length;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public paginate(e: any) {

  }

  public async addProduit() {
    const modal = await this.modalController.create({
      component: AddArticleComponent,
      componentProps: { value: 123 }
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data)
  }
}
