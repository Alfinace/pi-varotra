import { AddArticleComponent } from '../../shared/components/modals/add-article/add-article.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-space-store',
  templateUrl: './space-store.page.html',
  styleUrls: ['./space-store.page.scss'],
})
export class SpaceStorePage implements OnInit {
  rows = 8;

  produits: any = [];
  totalRecords: number;

  constructor(
    private modalController: ModalController,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticlesCurrentUser(0, 8).toPromise().then(res => {
      this.produits = res.rows;
      this.totalRecords = res.count;
    })
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
