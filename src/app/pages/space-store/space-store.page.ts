import { AddArticleComponent } from '../../shared/components/modals/add-article/add-article.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-space-store',
  templateUrl: './space-store.page.html',
  styleUrls: ['./space-store.page.scss'],
})
export class SpaceStorePage implements OnInit {
  rows = 8;

  produits: Article[] = [];
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
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data)
  }


  public async updateProduit(article: Article) {
    const modal = await this.modalController.create({
      component: AddArticleComponent,
      componentProps: { article }
    });

    await modal.present();

    let data = (await modal.onDidDismiss());
    let ar = data.data as Article;
    if (!ar) return;
    console.log(data);

    if (data.role === 'update') {
      this.produits = this.produits.map((produit: Article) => {
        if (produit.id === ar.id) {
          return ar;
        }
        return produit;
      })
    } else {
      this.produits.push(ar);
    }
  }
}
